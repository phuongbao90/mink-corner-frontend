import { useCartItemContext } from "@/features/cart/templates"
import { Badge } from "@mantine/core"

export const CartItemOutOfStockBadge = () => {
	const { cartItem } = useCartItemContext()
	const {
		product_item_id: { quantity },
	} = cartItem

	if (quantity <= 0) {
		return (
			<Badge component="span" color="gray" variant="filled">
				Hết hàng
			</Badge>
		)
	}

	return null
}
