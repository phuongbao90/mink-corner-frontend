import { DiscountBadge } from "@/components/badges"
import { useProductContext } from "@/components/product/ProductCard/product-card"
import { useProductPrice } from "@/features/products"
import { useProductVariant } from "@/hooks"
import { formatCurrency } from "@/utils"

export const ProductCardDiscountBadge = () => {
	const { loadedVariant, product } = useProductContext()
	const {
		category: { promotion_item_id: discount_item_from_category },
	} = product

	const isOutOfStock =
		typeof loadedVariant?.quantity === "number" && loadedVariant?.quantity <= 0
			? true
			: false

	const { discountPercent, discountAmount, isDiscounted, discountType } =
		useProductPrice(loadedVariant, discount_item_from_category)

	if (isOutOfStock) return null

	if (isDiscounted) {
		return (
			<DiscountBadge
				wrapperProps={{
					sx: {
						position: "absolute",
						top: "2%",
						right: "4%",
					},
				}}
				discountAmount={
					discountType === "amount"
						? formatCurrency(discountAmount)
						: `${discountPercent}%`
				}
			/>
		)
	}
	// if (isDiscountedFromCategory) {
	// 	return (
	// 		<DiscountBadge
	// 			wrapperProps={{
	// 				sx: {
	// 					position: "absolute",
	// 					top: "2%",
	// 					right: "4%",
	// 				},
	// 			}}
	// 			discountAmount={
	// 				isDiscountedFromCategory.type === "amount"
	// 					? formatCurrency(isDiscountedFromCategory.fixed_amount)
	// 					: `${isDiscountedFromCategory.percentage_rate}%`
	// 			}
	// 		/>
	// 	)
	// }

	return null
}
