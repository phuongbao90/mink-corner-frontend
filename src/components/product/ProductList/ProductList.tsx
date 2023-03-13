import ProductCard from "@/components/product/ProductCard"
import { ProductCardSkeleton } from "@/components/skeletons"
import { Product } from "@/features/products"
import { Box, Grid } from "@mantine/core"

import React from "react"

type PropsType = {
	products: Product[] | undefined
	isLoading: boolean
	isSuccess: boolean
	limit: number
	span: {
		base: number
		xs?: number
		sm?: number
		lg?: number
		xl?: number
	}
}

const MAX_COLUMNS = 12

export const ProductList = ({
	products,
	limit = 12,
	isLoading = true,
	isSuccess = false,
	span,
}: PropsType) => {
	return (
		<Box>
			<Grid gutter="xs">
				{isLoading &&
					Array(limit)
						.fill(false)
						.map((_, index) => (
							<Grid.Col
								key={index}
								span={span.base}
								xs={span.xs}
								sm={span.sm}
								lg={span.lg}
								xl={span.xl}
							>
								<ProductCardSkeleton />
							</Grid.Col>
						))}
				{/* -------------------- */}
				{isSuccess &&
					products &&
					products.map((product) => (
						<Grid.Col
							key={product.id}
							span={span.base}
							xs={span.xs}
							sm={span.sm}
							lg={span.lg}
							xl={span.xl}
						>
							<ProductCard product={product} />
						</Grid.Col>
					))}
			</Grid>
		</Box>
	)
}
