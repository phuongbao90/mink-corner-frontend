import { useCartItemContext } from "@/features/cart/templates"
import { Badge, Center, Text } from "@mantine/core"

export const CartItemOutOfStockOverlay = () => {
	const { cartItem } = useCartItemContext()
	const {
		product_item_id: { quantity },
	} = cartItem

	if (quantity <= 0) {
		return (
			<Center
				component="span"
				color="gray"
				variant="filled"
				sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
			>
				<Text align="center" c="white">
					Hết <br /> hàng
				</Text>
			</Center>
		)
	}

	return null
}
