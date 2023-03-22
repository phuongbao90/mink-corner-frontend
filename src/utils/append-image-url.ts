import { BACKEND_URL, PRODUCT_PLACEHOLDER_IMAGE_ID } from "@/constant"

export const appendImageUrl = (
	directusFileId: string | undefined,
	width?: number | undefined,
	height?: number | undefined,
	quality?: number | undefined
) => {
	if (!directusFileId) return PRODUCT_PLACEHOLDER_IMAGE_ID

	return `${BACKEND_URL}/assets/${directusFileId}${
		width || height || quality ? "?" : ""
	}${width ? `width=${width}` : ""}`
}
