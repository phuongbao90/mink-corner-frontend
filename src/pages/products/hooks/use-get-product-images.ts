import { DirectusImage, Product, ProductItem } from "@/features"
import { CoverImage } from "@/types"
import { isEmpty } from "lodash"

const useGetProductImages = (
	item: Product | ProductItem,
	selectedVariant?: ProductItem
) => {
	let images: DirectusImage[]
	let coverImage: CoverImage

	if (selectedVariant) {
		// console.log("1", 1)
		images = isEmpty(selectedVariant.images)
			? item.images
			: selectedVariant.images
		coverImage = selectedVariant.cover_image || item.cover_image
		return { images, coverImage }
	}

	// supplied product
	if ("product_item" in item) {
		// console.log("2", 2)
		images = item.images
		coverImage = item.cover_image
		return { images, coverImage }
	}

	// supplied product-item
	if ("product" in item) {
		// console.log("3", 3)
		images = isEmpty(item.product.images) ? item.images : item.product.images
		// coverImage = item.product.cover_image || item.cover_image
		coverImage = item.cover_image || item.product.cover_image
		return { images, coverImage }
	}

	console.log("4", 4)
	return { images: [], coverImage: null }
}

export default useGetProductImages
