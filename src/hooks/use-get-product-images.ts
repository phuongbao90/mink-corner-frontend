import { Product, ProductItem } from "@/features/products"
import { CoverImage, DirectusImages } from "@/types"
import isEmpty from "lodash/isEmpty"

export const useGetProductImages = (
	product?: Product | undefined,
	productItem?: ProductItem | undefined
) => {
	let images: DirectusImages | null | undefined = product?.images
	let coverImage: CoverImage | null | undefined = product?.cover_image

	if (!product && productItem) {
		return {
			images: productItem.images,
			coverImage: productItem.cover_image || productItem.product.cover_image,
		}
	}

	const productHasImages = !isEmpty(product?.images)
	const productHasCoverImage = !!product?.cover_image?.id
	const productItemHasImages = !isEmpty(productItem?.images)
	const productItemHasCoverImage = !!productItem?.cover_image?.id

	// prettier-ignore
	images =  productItemHasImages ? productItem?.images :
						productHasImages ? product?.images :
						productItemHasCoverImage ? [{directus_files_id: {id: String(productItem?.cover_image?.id)}}] :
						productHasCoverImage ? [{directus_files_id: {id: String(product?.cover_image?.id)}}] : []

	coverImage = productItem?.cover_image || product?.cover_image

	return { images, coverImage }
}
