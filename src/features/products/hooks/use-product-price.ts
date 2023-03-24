import isEmpty from "lodash/isEmpty"
import ceil from "lodash/ceil"
import { ProductItem } from "@/features/products"
import { PromotionItemType } from "@/features/promotion"

type ReturnType = {
	originalPrice: number | null
	effectivePrice: number | null
	isDiscounted: boolean
	discountPercent: number | null
	discountAmount: number | null
	discountType: "percentage" | "amount" | null
}

const defaultReturn = {
	originalPrice: null,
	effectivePrice: null,
	isDiscounted: false,
	discountPercent: null,
	discountAmount: null,
	discountType: null,
}

export const useProductPrice = (
	productItem: ProductItem | undefined,
	promotion_item_from_category?: PromotionItemType | undefined | null
): ReturnType => {
	if (!productItem || isEmpty(productItem)) return defaultReturn
	const { price, promotion_item } = productItem

	const selected_promotion_item = promotion_item || promotion_item_from_category

	const isDiscounted = !!selected_promotion_item
	if (!isDiscounted) {
		return {
			originalPrice: price,
			effectivePrice: price,
			isDiscounted: false,
			discountPercent: null,
			discountAmount: null,
			discountType: null,
		}
	}
	const { type, percentage_rate, fixed_amount } = selected_promotion_item

	if (type === "percentage") {
		const discountedAmount = ceil(
			Math.abs(price * (Number(percentage_rate) / 100)),
			-3
		)
		return {
			originalPrice: price,
			effectivePrice: Math.max(price - discountedAmount, 0),
			isDiscounted: price > price - discountedAmount,
			discountPercent: Number(percentage_rate),
			discountAmount: discountedAmount,
			discountType: "percentage",
		}
	}
	if (type === "amount") {
		const discountPercent = (Number(fixed_amount) / price).toFixed(0)
		return {
			originalPrice: price,
			effectivePrice: Math.max(price - Number(fixed_amount), 0),
			isDiscounted: price > price - Number(fixed_amount),
			discountPercent: Number(discountPercent),
			discountAmount: Number(fixed_amount),
			discountType: "amount",
		}
	}

	return defaultReturn
}
