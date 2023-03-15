import { pageRoutes } from "@/constant"
import { useGetCart } from "@/features/cart/cart.actions"
import { FreeshipNotice } from "@/features/cart/components"
import { CartItemList } from "@/features/cart/templates/cart-item-list"
import { CartSummaryTemplate } from "@/features/cart/templates/summary"
import { useCollectionStore } from "@/store/use-collection-store"
import { useCartSidebar } from "@/store/use-ui-store"
import { Box, Button, Stack, Text } from "@mantine/core"
import { useRouter } from "next/router"

export const CartSidebarView = () => {
	const { data: cart, isSuccess } = useGetCart()
	const router = useRouter()
	const { setCategoryFilter } = useCollectionStore((s) => s.actions)
	const [, { close: closeCartSidebar }] = useCartSidebar()

	if (isSuccess) {
		return cart.items_func.count > 0 ? (
			<Stack sx={{ height: "100%" }} pt="xs">
				<FreeshipNotice />
				<CartItemList cart={cart} />
				<Box sx={{ marginTop: "auto", paddingBottom: 40 }}>
					<CartSummaryTemplate />
				</Box>
			</Stack>
		) : (
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					height: "100%",
				}}
			>
				<Text mb="md" align="center">
					Giỏ hàng của bạn đang trống
				</Text>
				<Button
					variant="filled"
					fullWidth
					onClick={() => {
						closeCartSidebar()
						setCategoryFilter(null)
						router.push(pageRoutes.collection)
					}}
				>
					Bắt đầu mua sắm
				</Button>
			</Box>
		)
	}

	return null
}
