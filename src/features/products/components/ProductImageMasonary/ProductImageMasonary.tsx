import { CarouselWrapper, ProductImage } from "@/components"
import { useGetProductImages } from "@/hooks"
import { useProductState } from "@/store/context"
import { Box } from "@mantine/core"
import { isEmpty } from "lodash"

const ProductImageMasonary = () => {
	const { product, selected_product_item } = useProductState()
	const { images } = useGetProductImages(product, selected_product_item)

	if (!images || isEmpty(images)) return <Box sx={{ aspectRatio: "0.93" }} />

	return (
		<CarouselWrapper
			slides={images.map((el) => el.directus_files_id.id) || []}
			carouselOptions={{
				slidesToScroll: 1,
			}}
			withThumbnails
		>
			{images?.map((el) => (
				<Box
					key={el.directus_files_id.id}
					sx={{
						position: "relative",
						flex: "0 0 100%",
						aspectRatio: "0.93",
						borderRadius: 8,
						overflow: "hidden",
					}}
				>
					<ProductImage
						src={el.directus_files_id.id}
						alt="product-image-masonary"
						priority
						style={{ objectFit: "cover", borderRadius: 8 }}
						sizes="50vw"
					/>
				</Box>
			))}
		</CarouselWrapper>
	)
}

export { ProductImageMasonary }
