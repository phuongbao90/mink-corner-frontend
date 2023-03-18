import { useClearCart, useGetCart } from "@/features/cart"
import {
	useCreateOrder,
	useGetShippingFee,
} from "@/features/checkout/checkout.actions"
import { CreateOrderData } from "@/features/checkout/checkout.types"
import {
	SelectShippingMethod,
	SelectPaymentMethod,
} from "@/features/checkout/components"
import { CheckoutForm } from "@/features/checkout/templates/checkout-form"
import { CheckoutConfirmList } from "@/features/checkout/templates/checkout-confirmed-list"
import { useGetUser, useUpdateUser } from "@/features/user"
import { useShippingMethodActions } from "@/hooks"
import { sumCartAmount } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Container, Divider, Grid, Paper } from "@mantine/core"
import { useRouter } from "next/router"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { useOverlayLoader } from "@/store/use-ui-store"
import { useCheckoutStore } from "@/store/use-checkout-store"

const schema = z.object({
	name: z.string().trim().min(2, { message: "Tên không hợp lệ" }).max(100),
	email_address: z.string().email({ message: "Email không hợp lệ" }),
	phone_number: z
		.string()
		.trim()
		.min(10, { message: "Số điện thoại không hợp lệ" })
		.max(12, { message: "Số điện thoại không hợp lệ" }),
	address: z.string().trim().min(5, { message: "Địa chỉ không hợp lệ" }),
	city: z.string().min(1, "Giá trị không hợp lệ"),
	district: z.string().min(1, "Giá trị không hợp lệ"),
	ward: z.string().min(1, "Giá trị không hợp lệ"),
	shipping_method: z.number(),
	payment_method: z.number(),
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

	const cityName = useCheckoutStore((s) => s.cityName)
	const districtName = useCheckoutStore((s) => s.districtName)
	const wardName = useCheckoutStore((s) => s.wardName)

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
	} = methods

	const selectedCityId = methods.watch("city")
	const shipping_method = methods.watch("shipping_method")

	const { data: shippingMethods, selectedShippingMethod } =
		useShippingMethodActions({
			selectedCityId,
			selectedShippingMethodId: String(shipping_method),
		})

	const { shipping_fee } = useGetShippingFee(String(shipping_method))

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
				city: cityName,
				district: districtName,
				ward: wardName,
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
				router.push("/")
				await clearCartMutation.mutateAsync(cart.id)
				await updateUserMutation.mutateAsync({
					id: user.id,
					name: data.name,
					phone_number: data.phone_number,
					email_address: data.email_address,
				})
			},
			onSettled: () => {
				closeOverlay()
			},
		})
	}

	const onError = (errors: unknown) => {
		console.error(errors)
	}

	return (
		<Container size="xl">
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit, onError)}>
					<Grid>
						<Grid.Col span={12} sm={7}>
							<Paper p="md" shadow="md" withBorder radius="lg">
								<CheckoutForm />
								<Divider my="md" />
								<SelectShippingMethod shippingMethods={shippingMethods} />
								<Divider my="md" />
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
