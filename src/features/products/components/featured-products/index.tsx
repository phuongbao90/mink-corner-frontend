import { CarouselWrapper } from "@/components"
import ProductCard from "@/components/product/ProductCard"
import { useGetFeaturedProducts } from "@/features/products/products.actions"
import { Box, Title } from "@mantine/core"

export const FeaturedProducts = () => {
	const {
		data: featuredProducts,
		isLoading,
		isError,
	} = useGetFeaturedProducts()
	const { enabled, products } = featuredProducts || {}

	if (!products || isLoading || isError || !enabled) return null

	return (
		<Box py="xl" pl="xl">
			<Title order={2} align="left" mb="xl">
				Sản phẩm nổi bật
			</Title>

			<CarouselWrapper
				slides={products}
				autoplay
				withArrows
				carouselOptions={{
					slidesToScroll: 2,
				}}
			>
				{products.map((product, index) => (
					<Box
						sx={(theme) => ({
							position: "relative",
							flex: "0 0 44%",
							minWidth: 0,
							maxWidth: "100%",
							[theme.fn.largerThan("xs")]: {
								flex: "0 0 33%",
							},
							[theme.fn.largerThan("md")]: {
								flex: "0 0 20%",
							},
						})}
						pr="xs"
						key={product.id}
					>
						<ProductCard product={product} />
					</Box>
				))}
			</CarouselWrapper>
		</Box>
	)
}
