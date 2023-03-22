import { CheckoutPageHead } from "@/components/Head/checkout-page-head"
import { useGetCart } from "@/features/cart"
import { CheckoutTemplate, checkoutKeys } from "@/features/checkout"
import { fetchPaymentTypes, fetchShippingMethods } from "@/services"
import { Box, Button, Center, Title } from "@mantine/core"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetStaticProps } from "next"

const CheckOut = () => {
	const { data: cart, isSuccess } = useGetCart()

	if (isSuccess) {
		return (
			<>
				<CheckoutPageHead />
				{cart.items_func.count > 0 ? (
					<Box my="xl">
						<CheckoutTemplate />
					</Box>
				) : (
					<Center h="100%">
						<Box>
							<Title order={1} size="h4">
								Giỏ hàng của bạn đang trống!
							</Title>
							<Center mt="md">
								<Button size="md" fullWidth>
									Mua sắm ngay
								</Button>
							</Center>
						</Box>
					</Center>
				)}
			</>
		)
	}
	return null
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(
		checkoutKeys.paymentTypes(),
		fetchPaymentTypes
	)
	await queryClient.prefetchQuery(
		checkoutKeys.shippingMethods(),
		fetchShippingMethods
	)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default CheckOut
