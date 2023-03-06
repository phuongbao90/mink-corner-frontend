import {
	Product,
	ProductBreadcrumbs,
	ProductImageCarousel,
	ProductImageMasonary,
	ProductInfo,
} from "@/features/products"
import { ProductProvider } from "@/store/context"
import { Box, Container, Grid, MediaQuery } from "@mantine/core"

export const ProductDetailTemplate = ({ product }: { product: Product }) => {
	return (
		<ProductProvider product={product}>
			<Box py={40}>
				{/* --------------------------------- MOBILE ---------------------------------  */}
				<MediaQuery
					largerThan="xs"
					styles={{
						display: "none",
					}}
				>
					<Grid gutter="xl">
						<Grid.Col span={12} md={7}>
							<Box mb="xl" ml="xs">
								<ProductBreadcrumbs product={product} />
							</Box>

							<Box sx={{ aspectRatio: "0.85" }}>
								<ProductImageCarousel />
							</Box>
						</Grid.Col>
						<Grid.Col span={12} md={5}>
							<Container>
								<ProductInfo product={product} />
							</Container>
						</Grid.Col>
					</Grid>
				</MediaQuery>

				{/* --------------------------------- DESKTOP ---------------------------------  */}
				<MediaQuery
					smallerThan="xs"
					styles={{
						display: "none",
					}}
				>
					<Container>
						<Box mb="xl">
							<ProductBreadcrumbs product={product} />
						</Box>

						<Grid gutter="xl">
							<Grid.Col span={12} md={7}>
								<ProductImageMasonary />
							</Grid.Col>
							<Grid.Col span={12} md={5}>
								<ProductInfo product={product} />
							</Grid.Col>
						</Grid>
					</Container>
				</MediaQuery>
			</Box>
		</ProductProvider>
	)
}
