import { useClearCart, useGetCart } from "@/features/cart"
import {
	SelectShippingMethod,
	SelectPaymentMethod,
	useCreateOrder,
	useGetShippingFee,
	CreateOrderData,
} from "@/features/checkout"

import { UserContactForm } from "@/features/checkout/templates/user-contact-form"
import { CheckoutConfirmList } from "@/features/checkout/templates/checkout-confirmed-list"
import { useGetUser, useUpdateUser } from "@/features/user"
import { useShippingMethodActions } from "@/hooks"
import { sumCartAmount } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Paper,
	rem,
} from "@mantine/core"
import { useRouter } from "next/router"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { UserAddress } from "@/features/checkout/templates/user-address"
import { useCheckoutStore } from "@/store/use-checkout-store"

const schema = z.object({
	name: z.string().trim().min(2, { message: "Tên không hợp lệ" }).max(100),
	email_address: z.string().email({ message: "Email không hợp lệ" }),
	phone_number: z
		.string()
		.trim()
		.min(10, { message: "Số điện thoại không hợp lệ" })
		.max(12, { message: "Số điện thoại không hợp lệ" }),
	shipping_method: z.number().min(1, { message: "Giá trị không hợp lệ" }),
	payment_method: z.number().min(1, { message: "Giá trị không hợp lệ" }),
	address: z.string().trim().min(5, { message: "Địa chỉ không hợp lệ" }),
	city: z.string().min(1, "Giá trị không hợp lệ"),
	district: z.string().min(1, "Giá trị không hợp lệ"),
	ward: z.string().min(1, "Giá trị không hợp lệ"),
})

export type FormValues = z.infer<typeof schema>

const defaultValues = {
	name: "",
	phone_number: "",
	email_address: "",
	shipping_method: -1,
	payment_method: -1,
	address: "",
	city: "",
	district: "",
	ward: "",
}

export const CheckoutTemplate = () => {
	const { data: user } = useGetUser()
	const { data: cart } = useGetCart()
	const router = useRouter()

	const selectedAddress = useCheckoutStore((s) => s.selectedAddress)
	const resetStore = useCheckoutStore((s) => s.actions.reset)
	const subTotal = sumCartAmount(cart?.items)
	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		//@ts-ignore
		values: {
			name: user?.name || "",
			phone_number: user?.phone_number || "",
			email_address: user?.email_address || "",
		},
	})

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = methods

	const selectedCityId = methods.watch("city")
	const shipping_method = methods.watch("shipping_method")

	const { selectedShippingMethod } = useShippingMethodActions({
		selectedCityId,
		selectedShippingMethodId: String(shipping_method),
	})

	const { shipping_fee } = useGetShippingFee(String(shipping_method))

	const createOrderMutation = useCreateOrder()
	const updateUserMutation = useUpdateUser()
	const clearCartMutation = useClearCart()

	const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
		if (!user || !cart || !cart.items) return

		const shipping_address: CreateOrderData["shipping_address"] = {
			address: data.address,
			city: data.city,
			district: data.district,
			ward: data.ward,
			user: { id: user?.id },
		}
		if (selectedAddress) shipping_address.id = selectedAddress.id

		const createOrderData: CreateOrderData = {
			payment_method: data.payment_method,
			shipping_method: +data.shipping_method,
			shipping_address: shipping_address,
			user: { id: user?.id },

			items: cart?.items
				?.filter((el) => el.product_item_id.quantity > 0)
				?.map((el) => ({
					price: String(el.product_item_id.price),
					quantity: +el.quantity,
					product_item_id: +el.product_item_id.id,
				})),
			total: subTotal + +(shipping_fee || 0),
		}

		createOrderMutation.mutate(createOrderData, {
			onSuccess: async () => {
				reset(defaultValues)
				resetStore()

				await clearCartMutation.mutateAsync(cart.id)
				await updateUserMutation.mutateAsync({
					id: user.id,
					name: data.name,
					phone_number: data.phone_number,
					email_address: data.email_address,
				})
				router.push("/")
			},
		})
	}

	const onError = (errors: unknown) => {
		console.error(errors)
	}

	return (
		<Container size="lg">
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit, onError)}>
					<Grid>
						<Grid.Col span={12} sm={7} p={rem(4)}>
							<Paper p="md" shadow="md" withBorder radius="lg">
								<UserContactForm />

								<Divider my="xl" color="gray.2" />

								<UserAddress />

								<Divider my="xl" color="gray.2" />

								<SelectShippingMethod />

								<Divider my="xl" color="gray.2" />

								<SelectPaymentMethod />

								<Box sx={{ textAlign: "right" }}>
									<Button type="submit" mt="xl" disabled={isSubmitting}>
										Hoàn tất
									</Button>
								</Box>
							</Paper>
						</Grid.Col>

						<Grid.Col
							span={12}
							sm={5}
							sx={(theme) => ({
								[theme.fn.smallerThan("sm")]: {
									display: "none",
								},
							})}
						>
							<CheckoutConfirmList
								selectedShippingMethod={selectedShippingMethod}
							/>
						</Grid.Col>
					</Grid>
				</form>
			</FormProvider>
		</Container>
	)
}
