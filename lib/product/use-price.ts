import { Product } from "lib/types"

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
export const usePrice = (product: Props | undefined): Price => {
	if (!product)
		return {
			originalPrice: null,
			effectivePrice: null,
			discountPercentage: null,
			discountAmount: null,
			isDiscounted: null,
		}
	const { price, discountPercentage } = product

	if (!product.discountPercentage) {
		return {
			originalPrice: price,
			effectivePrice: price,
			discountPercentage,
			discountAmount: 0,
			isDiscounted: false,
		}
	}

	const discountAmount = price * (discountPercentage / 100)

	return {
		originalPrice: price,
		effectivePrice: price - discountAmount,
		discountPercentage,
		discountAmount,
		isDiscounted: true,
	}
}
