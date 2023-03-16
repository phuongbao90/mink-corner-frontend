import { Head } from "@/components"
import { useGetCart } from "@/features/cart"
import { CheckoutTemplate } from "@/features/checkout"
import { Box, Button, Center, Title } from "@mantine/core"

const CheckOut = () => {
	const { data: cart, isSuccess } = useGetCart()

	if (isSuccess) {
		return (
			<>
				<Head
					title="Thanh toán"
					description="Điền thông tin thanh toán của bạn"
				/>
				{cart.items_func.count > 0 ? (
					<Box my="xl">
						<CheckoutTemplate />
					</Box>
				) : (
					<Center h="100%">
						<Box>
							<Title order={4}>Giỏ hàng của bạn đang trống!</Title>
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

export default CheckOut
