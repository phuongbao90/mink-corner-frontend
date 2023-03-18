import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { Indicator, Text } from "@mantine/core"
import { ReactNode } from "react"

export const QuantityIndicator = ({ children }: { children: ReactNode }) => {
	const { cartItem } = useCartItemContext()

	return (
		<Indicator
			label={<Text size={12}>{cartItem?.quantity}</Text>}
			color="red.6"
			size={18}
			zIndex={2}
		>
			{children}
		</Indicator>
	)
}
