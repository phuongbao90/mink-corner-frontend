import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { Group, Text } from "@mantine/core"

export const OptionInfo = () => {
	const { cartItem } = useCartItemContext()

	return (
		<Group mt={2}>
			{!!cartItem.product_item_id.color && (
				<Text fz="xs" c="gray.6">
					Màu: {cartItem.product_item_id.color.title}
				</Text>
			)}
			{!!cartItem.product_item_id.size && (
				<Text fz="xs" c="gray.6">
					Kích thước: {cartItem.product_item_id.size.title}
				</Text>
			)}
		</Group>
	)
}
