import { CarouselWrapper, DirectusImage } from "@/components"
import { isEmpty } from "lodash"
import { useGetProductImages } from "@/hooks"
import { useProductState } from "@/store/context"
import { Box } from "@mantine/core"

const ProductImageCarousel = () => {
	const { product, selected_product_item } = useProductState()
	const { images } = useGetProductImages(product, selected_product_item)

	if (!images || isEmpty(images)) {
		return <div>no image available</div>
	}

	return (
		<CarouselWrapper
			withDots
			slides={images?.map((image) => image.directus_files_id.id)}
			carouselOptions={{
				slidesToScroll: 1,
			}}
			withThumbnails
		>
			{images.map(({ directus_files_id }, index) => (
				<Box
					key={index}
					sx={{
						position: "relative",
						aspectRatio: "0.85",
						flex: "0 0 100%",
					}}
				>
					<DirectusImage
						src={directus_files_id.id}
						alt="product-image-carousel"
						style={{
							objectFit: "cover",
						}}
						sizes="100vw"
					/>
				</Box>
			))}
		</CarouselWrapper>
	)
}

export { ProductImageCarousel }
