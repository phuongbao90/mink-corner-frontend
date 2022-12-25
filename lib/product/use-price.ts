import { Product } from "lib/types"
import { roundNumber } from "lib/utils"

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
			originalPrice: roundNumber(price),
			effectivePrice: roundNumber(price),
			discountPercentage: roundNumber(discountPercentage),
			discountAmount: 0,
			isDiscounted: false,
		}
	}

	const discountAmount = price * (discountPercentage / 100)

	return {
		originalPrice: roundNumber(price),
		effectivePrice: roundNumber(price - discountAmount),
		discountPercentage: roundNumber(discountPercentage),
		discountAmount,
		isDiscounted: true,
	}
}
