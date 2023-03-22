import { CarouselWrapper } from "@/components"
import { ProductCard } from "@/components/product"
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
		<Box py="xl" pl="md">
			<Title order={2} align="left" mb="xl" tt="capitalize">
				Sản phẩm nổi bật
			</Title>

			<CarouselWrapper
				slides={products.map((el) => el?.cover_image?.id || "")}
				autoplay
				withArrows
				carouselOptions={{
					slidesToScroll: 2,
				}}
			>
				{products.map((product) => (
					<Box
						sx={(theme) => ({
							position: "relative",
							flex: "0 0 43%",
							minWidth: 0,
							maxWidth: "100%",
							[theme.fn.largerThan("xs")]: {
								flex: "0 0 33%",
							},
							[theme.fn.largerThan("md")]: {
								flex: "0 0 16.666667%",
							},
						})}
						pr="xs"
						key={product.id}
					>
						<ProductCard product={product}>
							<ProductCard.CoverImage>
								<ProductCard.DiscountBadge />
								<ProductCard.OutOfStockBadge />
								<ProductCard.NewReleasedBadge />
							</ProductCard.CoverImage>
							<ProductCard.Title />
							<ProductCard.Price />
						</ProductCard>
					</Box>
				))}
			</CarouselWrapper>
		</Box>
	)
}
