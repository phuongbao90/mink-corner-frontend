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
}

export const ProductList = ({
	products,
	limit = 12,
	isLoading = true,
	isSuccess = false,
}: PropsType) => {
	return (
		<Box>
			<Grid gutter="xs">
				{isLoading &&
					Array(limit)
						.fill(false)
						.map((_, index) => (
							<Grid.Col span={6} sm={3} md={2} key={index}>
								<ProductCardSkeleton />
							</Grid.Col>
						))}
				{/* -------------------- */}
				{isSuccess &&
					products &&
					products.map((product) => (
						<Grid.Col span={6} sm={3} md={2} key={product.id}>
							<ProductCard product={product} />
						</Grid.Col>
					))}
			</Grid>
		</Box>
	)
}
