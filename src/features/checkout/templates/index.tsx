import { useClearCart, useGetCart } from "@/features/cart"
import {
	useCreateOrder,
	useGetShippingFee,
} from "@/features/checkout/checkout.actions"
import { CreateOrderData } from "@/features/checkout/checkout.types"
import {
	DeliveryMethodSelect,
	PaymentMethodSelect,
} from "@/features/checkout/components"
import { CheckoutForm } from "@/features/checkout/templates/checkout-form"
import { CheckoutConfirmList } from "@/features/checkout/templates/checkout-confirmed-list"
import { useGetUser, useUpdateUser } from "@/features/user"
import { useShippingMethodActions } from "@/hooks"
import { sumCartAmount } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Container, Divider, Grid } from "@mantine/core"
import { useRouter } from "next/router"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { useOverlayLoader } from "@/store/use-ui-store"

const schema = z.object({
	name: z.string().trim().min(2, { message: "Tên không hợp lệ" }).max(100),
	email_address: z.string().email({ message: "Email không hợp lệ" }),
	phone_number: z
		.string()
		.trim()
		.min(10, { message: "Số điện thoại không hợp lệ" })
		.max(12, { message: "Số điện thoại không hợp lệ" }),
	address: z.string().trim().min(5, { message: "Địa chỉ không hợp lệ" }),
	city: z.object({
		value: z.string().min(1, "Giá trị không hợp lệ"),
		label: z.string(),
	}),
	district: z.object({
		value: z.string().min(1, "Giá trị không hợp lệ"),
		label: z.string(),
	}),
	ward: z.object({
		value: z.string().min(1, "Giá trị không hợp lệ"),
		label: z.string(),
	}),
	shipping_method: z.string(),
	payment_method: z.string(),
})

export type FormValues = z.infer<typeof schema>

export const CheckoutTemplate = () => {
	const { data: user } = useGetUser()
	const { data: cart } = useGetCart()
	const router = useRouter()

	const subTotal = sumCartAmount(cart?.items)
	const [, { open: openOverlay, close: closeOverlay }] = useOverlayLoader()

	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
		//@ts-ignore
		values: {
			name: user?.name || "",
			phone_number: user?.phone_number || "",
			email_address: user?.email_address || "",
			// address: "",
			// city: null,
			// district: null,
			// ward: null,
			// shipping_method: null,
			// payment_method: null,
		},
	})

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods

	const selectedCityId = methods.watch("city.value")
	const shipping_method = methods.watch("shipping_method")

	const { data: shippingMethods, selectedShippingMethod } =
		useShippingMethodActions({
			selectedCityId,
			selectedShippingMethodId: shipping_method,
		})

	const { shipping_fee } = useGetShippingFee(shipping_method)

	const createOrderMutation = useCreateOrder()
	const updateUserMutation = useUpdateUser()
	const clearCartMutation = useClearCart()

	const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
		if (!user || !cart || !cart.items) return
		if (!data.shipping_method || !data.payment_method) return

		const createOrderData: CreateOrderData = {
			payment_method: +data.payment_method,
			shipping_method: +data.shipping_method,
			shipping_address: {
				address: data.address,
				city: data.city?.label,
				district: data.district?.label,
				ward: data.ward?.label,
				user: { id: user.id },
			},
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

		openOverlay()

		createOrderMutation.mutate(createOrderData, {
			onSuccess: async () => {
				await router.push("/")

				await clearCartMutation.mutateAsync(cart.id)

				await updateUserMutation.mutateAsync({
					id: user.id,
					name: data.name,
					phone_number: data.phone_number,
					email_address: data.email_address,
				})
			},
			onSettled: () => closeOverlay(),
		})
	}

	const onError = (errors: unknown) => {
		console.error(errors)
	}

	return (
		<FormProvider {...methods}>
			<Container size="xl">
				<form onSubmit={methods.handleSubmit(onSubmit, onError)}>
					<Grid>
						<Grid.Col span={12} md={7} order={2} orderMd={1}>
							<CheckoutForm />

							<Divider my="md" />

							<DeliveryMethodSelect shippingMethods={shippingMethods} />

							<Divider my="md" />

							<PaymentMethodSelect />

							<Box sx={{ textAlign: "right" }}>
								<Button
									variant="outline"
									color="indigo.6"
									type="submit"
									mt="xl"
									disabled={isSubmitting}
								>
									Hoàn tất
								</Button>
							</Box>
						</Grid.Col>
						<Grid.Col span={12} md={5} order={1} orderMd={2}>
							<CheckoutConfirmList
								selectedShippingMethod={selectedShippingMethod}
							/>
						</Grid.Col>
					</Grid>
				</form>
			</Container>
		</FormProvider>
	)
}
