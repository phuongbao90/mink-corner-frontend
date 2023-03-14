import { useProductContext } from "@/components/product/ProductCard/product-card"
import { Badge } from "@mantine/core"

export const ProductCardOutOfStockBadge = () => {
	const { loadedVariant } = useProductContext()

	const isOutOfStock =
		typeof loadedVariant?.quantity === "number" && loadedVariant?.quantity <= 0
			? true
			: false

	if (isOutOfStock) {
		return (
			<Badge
				component="span"
				color="gray"
				variant="filled"
				sx={{
					position: "absolute",
					top: "3%",
					right: "4%",
					alignItems: "baseline",
				}}
			>
				Hết hàng
			</Badge>
		)
	}

	return null
}
