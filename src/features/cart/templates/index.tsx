import { pageRoutes } from "@/constant"
import { useGetCart } from "@/features/cart/cart.actions"
import { FreeshipNotice } from "@/features/cart/components"
import { CartItemsTemplate } from "@/features/cart/templates/items"
import { CartSummaryTemplate } from "@/features/cart/templates/summary"
import { useBoundStore } from "@/store/useStore"
import { Box, Button, Flex, Stack, Text } from "@mantine/core"
import { useRouter } from "next/router"

export const CartTemplate = () => {
	const { data: cart, isSuccess } = useGetCart()
	const router = useRouter()
	const toggleIsSidebarCartVisible = useBoundStore(
		(s) => s.actions.toggleIsSidebarCartVisible
	)

	if (isSuccess) {
		return cart.items_func.count > 0 ? (
			<Stack sx={{ height: "100%" }} pt="xs">
				<FreeshipNotice />
				<CartItemsTemplate />
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
					variant="outline"
					color="indigo.7"
					fullWidth
					onClick={() => {
						toggleIsSidebarCartVisible()
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
