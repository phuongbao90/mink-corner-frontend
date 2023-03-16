import { DirectusImage } from "@/components"
import { useCartItemContext } from "@/features/cart/templates/cart-item"

import { Box, Sx } from "@mantine/core"
import { ReactNode } from "react"

export const CartItemImage = ({
	children,
	sx,
}: {
	sx?: Sx
	children?: ReactNode
}) => {
	const { cartItem } = useCartItemContext()

	const {
		product_item_id: { quantity },
	} = cartItem

	const imageId =
		cartItem.product_item_id.cover_image?.id ||
		cartItem.product_item_id.product.cover_image?.id

	return (
		<Box
			sx={{
				position: "relative",
				aspectRatio: "0.9",
				cursor: "pointer",
				...(sx || {}),
			}}
		>
			{imageId && (
				<DirectusImage
					alt="product-image"
					src={imageId}
					sizes="10vw"
					style={{
						objectFit: "cover",
						borderRadius: 8,
						filter: quantity <= 0 ? "brightness(0.65)" : "",
					}}
				/>
			)}
			{children}
		</Box>
	)
}
