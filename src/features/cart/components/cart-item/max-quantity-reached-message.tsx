import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { Box, Text } from "@mantine/core"

export const MaxQuantityReachedMessage = () => {
	const { isMaxQuantityMet } = useCartItemContext()

	return isMaxQuantityMet ? (
		<Text size="xs" color="red.6">
			Đã đạt hạn mức tối đa
		</Text>
	) : null
}
