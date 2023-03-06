import ProductCard from "@/components/product/ProductCard"
import { ProductCardSkeleton } from "@/components/skeletons"
import {
	useGetFilteredProducts,
	useGetLatestProducts,
} from "@/features/products"
import { Box, Container, Grid, Title } from "@mantine/core"

import React from "react"

export const ProductList = () => {
	const { data: products, isSuccess, isLoading } = useGetLatestProducts()

	return (
		<Box my="xl">
			<Title mb="xl" order={2}>
				sản phẩm mới
			</Title>

			<Grid gutter="xs">
				{isLoading &&
					Array(8)
						.fill(false)
						.map((product, index) => (
							<Grid.Col span={6} sm={4} md={3} key={index}>
								<ProductCardSkeleton />
							</Grid.Col>
						))}
				{isSuccess &&
					products.map((product) => (
						<Grid.Col span={6} sm={4} md={3} key={product.id}>
							<ProductCard product={product} />
						</Grid.Col>
					))}
			</Grid>
		</Box>
	)
}
