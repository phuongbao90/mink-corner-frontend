import { pageRoutes } from "@/constant"
import { useGetCart } from "@/features/cart/cart.actions"
import { useCartSidebar } from "@/store/use-ui-store"
import { formatCurrency, sumCartAmount } from "@/utils"
import { Box, Button, Divider, Group, rem, Text, Title } from "@mantine/core"
import { useRouter } from "next/router"

export const CartSummaryTemplate = () => {
	const router = useRouter()
	const { data: cart, isSuccess } = useGetCart()

	const [, { close }] = useCartSidebar()
	const total = sumCartAmount(cart?.items)

	if (isSuccess) {
		return (
			<Box px={rem(8)}>
				<Divider mb="sm" mx={"-xl"} />
				<Box my="xl">
					<Title mb={8} order={5}>
						Thông tin đơn hàng
					</Title>
					<Group position="apart" align="baseline">
						<Text fw={600} tt="capitalize" fz="sm">
							tổng tiền:
						</Text>

						<Text fw={600}>{formatCurrency(total)}</Text>
					</Group>
				</Box>
				<Button
					onClick={() => {
						close()
						router.push(pageRoutes.checkout)
					}}
					fullWidth
					tt="uppercase"
				>
					thanh toán
				</Button>
			</Box>
		)
	}
	return null
}
