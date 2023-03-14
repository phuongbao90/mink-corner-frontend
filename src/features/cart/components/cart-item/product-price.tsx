import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { useProductPrice } from "@/features/products"
import { formatCurrency } from "@/utils"
import { Text } from "@mantine/core"

export const CartItemPrice = () => {
	const { cartItem } = useCartItemContext()
	const { effectivePrice } = useProductPrice(
		cartItem.product_item_id,
		cartItem.product_item_id.product.category.promotion_item_id
	)

	const {
		product_item_id: { quantity },
	} = cartItem

	return (
		<Text
			fw={600}
			size="sm"
			mt={{ base: 6, md: 0 }}
			align="right"
			sx={(theme) => ({
				flex: "0 0 22%",
				[theme.fn.smallerThan("xs")]: {
					fontSize: 12,
				},
			})}
			strikethrough={quantity <= 0}
		>
			{formatCurrency(Number(effectivePrice))}
		</Text>
	)
}
