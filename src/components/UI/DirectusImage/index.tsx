import { BACKEND_URL, BREAKPOINT_MD, BREAKPOINT_SM } from "@/constant"
import Image, { ImageProps } from "next/image"

export const directusLoader = ({
	src: fileId,
	width,
	quality = 80,
}: {
	src: string
	width?: number
	quality?: number
}) => {
	return `${BACKEND_URL}/assets/${fileId}?quality=${quality}${
		!!width && `&width=${width}`
	}`
}

export const DirectusImage = (props: ImageProps) => {
	return (
		<Image
			fill
			loader={directusLoader}
			{...props}
			style={{
				objectFit: "cover",
				...props.style,
			}}
			alt="image"
		/>
	)
}

export const ProductImage = (props: ImageProps) => {
	return (
		<Image
			fill
			style={{
				objectFit: "contain",
				...(props.style || {}),
			}}
			loader={directusLoader}
			sizes={`
				(max-width: ${BREAKPOINT_MD}px) 100vw,
				50vw,
			`}
			{...props}
			alt="product-image"
		/>
	)
}

export const ProductCardImage = (props: ImageProps) => {
	return (
		<Image
			fill
			style={{
				objectFit: "contain",
			}}
			loader={directusLoader}
			sizes={`
			(max-width: ${BREAKPOINT_SM}px) 50vw,
			(max-width: ${BREAKPOINT_MD}px) 33vw,
			25vw,
			`}
			{...props}
			alt="product-card-image"
		/>
	)
}
export const IconImage = (props: ImageProps) => {
	return (
		<Image
			// fill
			style={{
				objectFit: "contain",
			}}
			loader={directusLoader}
			sizes={`${props.width}px`}
			quality={100}
			{...props}
			alt="product-card-image"
		/>
	)
}
