import { DirectusImage } from "@/components"
import { useCartItemContext } from "@/features/cart/templates/cart-item"

import { Box } from "@mantine/core"

export const CartItemImage = () => {
	const { cartItem } = useCartItemContext()

	const imageId =
		cartItem.product_item_id.cover_image?.id ||
		cartItem.product_item_id.product.cover_image?.id

	return (
		<Box sx={{ position: "relative", aspectRatio: "0.9", cursor: "pointer" }}>
			{imageId && (
				<DirectusImage
					alt="product-image"
					src={imageId}
					sizes="10vw"
					style={{
						objectFit: "cover",
						borderRadius: 8,
					}}
				/>
			)}
		</Box>
	)
}
