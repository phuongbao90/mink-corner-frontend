import { useClearCart, useGetCart, useSumCartItems } from "@/features/cart"
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
import { CheckoutSummary } from "@/features/checkout/templates/checkout-summary"
import { useGetUser, useUpdateUser } from "@/features/user"
import { useShippingMethodActions } from "@/hooks"
import { useBoundStore } from "@/store/useStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Container, Divider, Grid } from "@mantine/core"
import { useRouter } from "next/router"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"

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

	const subTotal = useSumCartItems(cart?.items)

	const toggleIsOverlayLoaderVisible = useBoundStore(
		(s) => s.actions.toggleIsOverlayLoaderVisible
	)
	const methods = useForm<FormValues>({
		resolver: zodResolver(schema),
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

	const {
		data: shippingMethods,
		selectedShippingMethod,
		// selectShippingMethod,
	} = useShippingMethodActions({
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
			shipping_method: +data.shipping_method,
			payment_method: +data.payment_method,
			shipping_address: {
				address: data.address,
				city: data.city?.label,
				district: data.district?.label,
				ward: data.ward?.label,
				user: {
					id: user.id,
				},
			},
			user: { id: user?.id },
			items: cart?.items?.map((el) => ({
				price: el.product_item_id.price,
				quantity: el.quantity,
				product_item_id: +el.product_item_id.id,
			})),
			total: String(subTotal + +(shipping_fee || 0)),
		}
		toggleIsOverlayLoaderVisible(true)

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
			onSettled: () => toggleIsOverlayLoaderVisible(false),
		})
		// updateUserMutation.mutate({
		// 	id: user.id,
		// 	name: data.name,
		// 	phone_number: data.phone_number,
		// 	email_address: data.email_address,
		// })
		// }
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

							<DeliveryMethodSelect
								shippingMethods={shippingMethods}
								// selectShippingMethod={selectShippingMethod}
							/>

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
							<CheckoutSummary
								selectedShippingMethod={selectedShippingMethod}
							/>
						</Grid.Col>
					</Grid>
				</form>
			</Container>
		</FormProvider>
	)
}
