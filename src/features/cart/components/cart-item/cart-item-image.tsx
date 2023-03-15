import { DirectusImage } from "@/components"
import { useCartItemContext } from "@/features/cart/templates/cart-item"

import { Box, BoxProps } from "@mantine/core"

export const CartItemImage = (BoxProps?: BoxProps) => {
	const { cartItem } = useCartItemContext()

	const {
		product_item_id: { quantity },
	} = cartItem

	const imageId =
		cartItem.product_item_id.cover_image?.id ||
		cartItem.product_item_id.product.cover_image?.id

	return (
		<Box
			{...BoxProps}
			sx={{
				position: "relative",
				aspectRatio: "0.9",
				cursor: "pointer",
				...(BoxProps || {}).sx,
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
		</Box>
	)
}
