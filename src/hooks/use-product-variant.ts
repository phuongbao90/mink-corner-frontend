import isEmpty from "lodash/isEmpty"
import { Product, ProductItem } from "@/features/products"

type ReturnProps = {
	loadedVariant: ProductItem | undefined
}

export const useProductVariant = (product: Product | null): ReturnProps => {
	if (!product) {
		return { loadedVariant: undefined }
	}

	const productItems = product.product_item
	if (!productItems || isEmpty(productItems))
		return {
			loadedVariant: undefined,
		}

	const sortedProductItems = [...productItems]?.sort(
		(a, b) => +a.price - +b.price
	)
	const lowestPriceProductItem = sortedProductItems?.[0]
	const availableProductItem = sortedProductItems?.find(
		(item) => item.quantity > 0
	)
	const isLowestPriceVariantAvailable = lowestPriceProductItem?.quantity > 0
	let loadedVariant = lowestPriceProductItem

	// if (isLowestPriceVariantAvailable) {
	// 	loadedVariant = lowestPriceProductItem
	// }
	if (!isLowestPriceVariantAvailable && availableProductItem) {
		loadedVariant = availableProductItem
	}

	return {
		loadedVariant: loadedVariant,
	}
}
