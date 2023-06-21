import { BACKEND_URL, BREAKPOINT_MD, BREAKPOINT_SM } from "@/constant"
import Image, { ImageProps } from "next/image"
import _BrokenImage from "public/images/broken-image.png"

interface _ImageProps extends Omit<ImageProps, "src"> {
	src: Pick<ImageProps, "src">["src"] | undefined
}

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

const BrokenImage = (props: _ImageProps) => {
	return <Image fill {...props} src={_BrokenImage} alt="" />
}

export const DirectusImage = (props: _ImageProps) => {
	if (!props.src) {
		return <BrokenImage {...props} />
	}

	return (
		<Image
			fill
			loader={directusLoader}
			{...(props as ImageProps)}
			style={{
				objectFit: "cover",
				...props.style,
			}}
			alt="image"
		/>
	)
}

export const ProductImage = (props: _ImageProps) => {
	if (!props.src) {
		return <BrokenImage {...props} />
	}

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
			{...(props as ImageProps)}
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
	if (!props.width || !props.height) {
		return (
			<Image
				fill
				style={{
					objectFit: "contain",
				}}
				loader={directusLoader}
				quality={100}
				{...props}
				alt="icon image"
			/>
		)
	}

	return (
		<Image
			style={{
				objectFit: "contain",
			}}
			loader={directusLoader}
			sizes={`${props.width}px`}
			quality={100}
			{...props}
			alt="icon image"
		/>
	)
}

export const LocalImage = (props: ImageProps) => {
	if (!props.width || !props.height) {
		return (
			<Image
				fill
				style={{
					objectFit: "contain",
				}}
				quality={80}
				{...props}
				alt="image"
			/>
		)
	}

	return (
		<Image
			style={{
				objectFit: "contain",
			}}
			sizes={`${props.width}px`}
			quality={80}
			{...props}
			alt="icon image"
		/>
	)
}
