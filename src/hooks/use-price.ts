import { Product, ProductItem } from "@/features/products"
import { roundNumber } from "@/utils"

export type Price = {
	originalPrice: number | null
	effectivePrice: number | null
	discountPercentage: number | null
	discountAmount: number | null
	isDiscounted: boolean | null
}

export type Props = {
	price: number
	discountPercentage: number
}

// export const usePrice = (product: Product): Price => {
export const usePrice = (
	product: Product,
	selectedProductItem?: ProductItem
): Price => {
	if (selectedProductItem) {
		return {
			originalPrice: +selectedProductItem.price,
			effectivePrice: +selectedProductItem.price,
			discountPercentage: null,
			discountAmount: null,
			isDiscounted: null,
		}
	}

	const productItems = product?.product_item
	const sortedProductItems = productItems.sort((a, b) => +a.price - +b.price)
	const lowestPriceProductItem = sortedProductItems?.[0]

	return {
		originalPrice: +lowestPriceProductItem?.price,
		effectivePrice: +lowestPriceProductItem?.price,
		discountPercentage: null,
		discountAmount: null,
		isDiscounted: null,
	}
}
