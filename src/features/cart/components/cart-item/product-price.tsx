import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { useProductPrice } from "@/features/products"
import { formatCurrency } from "@/utils"
import { Text } from "@mantine/core"

export const CartItemPrice = () => {
	const { cartItem } = useCartItemContext()
	const { effectivePrice } = useProductPrice(cartItem.product_item_id)

	return (
		<Text
			fw={600}
			size="sm"
			mt={{ base: 6, md: 0 }}
			sx={(theme) => ({
				[theme.fn.smallerThan("xs")]: {
					fontSize: 12,
				},
			})}
		>
			{formatCurrency(Number(effectivePrice))}
		</Text>
	)
}
