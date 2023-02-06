import { DirectusImage, Product, ProductItem } from "@/features"

const useGetProductImages = (
	product: Product,
	selectedVariant: ProductItem | null
) => {
	let images: DirectusImage[] = product.images

	if (!product.share_images && selectedVariant && selectedVariant.images) {
		images = selectedVariant.images
	}

	return { images }
}

export default useGetProductImages
