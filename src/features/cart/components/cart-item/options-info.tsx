import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { Group, Text } from "@mantine/core"

export const OptionInfo = () => {
	const { cartItem } = useCartItemContext()

	return (
		<Group>
			{!!cartItem.product_item_id.color && (
				<Text fz="xs" c="gray.6" fw={600}>
					Màu:{" "}
					<Text c="gray.7" span>
						{cartItem.product_item_id.color.title}
					</Text>
				</Text>
			)}
			{!!cartItem.product_item_id.size && (
				<Text fz="xs" c="gray.6">
					Kích thước:{" "}
					<Text c="gray.7">{cartItem.product_item_id.size.title}</Text>
				</Text>
			)}
		</Group>
	)
}
