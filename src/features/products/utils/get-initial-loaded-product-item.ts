import { Product, ProductItem } from "@/features/products/products.types"

// case 1: INSTOCK - return lowest price product item with discount
// case 2: INSTOCK - return lowest price product item
// case 3: OUTOFSTOCK - return lowest price product item with discount
// case 4: OUTOFSTOCK - return lowest price product item

export function getInitialLoadedProductItem(
	product: Product | undefined
): undefined | ProductItem {
	if (!product) return undefined

	const { product_item } = product
	if (!product_item) return undefined

	const sortedProductItemByPrice = [...product_item]?.sort(
		(a, b) => a.price - b.price
	)

	const inStockSorted = sortedProductItemByPrice.filter((el) => el.quantity > 0)

	const INSTOCK = inStockSorted.length > 0

	if (INSTOCK) {
		const lowestPriceWithDiscount = inStockSorted.find(
			(item) => item.promotion_item
		)

		if (lowestPriceWithDiscount) return lowestPriceWithDiscount
		return inStockSorted[0]
	}

	// OUT OF STOCK
	const lowestPriceWithDiscount = sortedProductItemByPrice.find(
		(item) => item.promotion_item
	)
	if (lowestPriceWithDiscount) return lowestPriceWithDiscount
	return sortedProductItemByPrice[0]
}
