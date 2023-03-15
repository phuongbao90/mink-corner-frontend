import { pageRoutes } from "@/constant"
import { useGetCart } from "@/features/cart/cart.actions"
import { useCartSidebar } from "@/store/use-ui-store"
import { formatCurrency, sumCartAmount } from "@/utils"
import { Box, Button, Divider, Flex, Text, Title } from "@mantine/core"
import { useRouter } from "next/router"

export const CartSummaryTemplate = () => {
	const router = useRouter()
	const { data: cart, isSuccess } = useGetCart()

	const [, { close }] = useCartSidebar()
	const total = sumCartAmount(cart?.items)

	if (isSuccess) {
		return (
			<Box>
				<Divider mb="sm" />
				<Box my="xl">
					<Title mb={8} order={4}>
						Thông tin đơn hàng
					</Title>
					<Flex justify={"space-between"}>
						<Text fw={600}>tổng tiền: </Text>

						{/* <Text fw={600}>{formatCurrency(sumCartAmount(cart.items))}</Text> */}
						<Text fw={600}>{formatCurrency(total)}</Text>
					</Flex>
				</Box>
				<Button
					variant="outline"
					color="indigo.4"
					onClick={() => {
						close()
						router.push(pageRoutes.checkout)
					}}
					fullWidth
				>
					thanh toán
				</Button>
			</Box>
		)
	}
	return null
}
