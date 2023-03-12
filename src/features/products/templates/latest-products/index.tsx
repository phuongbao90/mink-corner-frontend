import { ProductList } from "@/components"
import { useGetLatestProducts } from "@/features/products/products.actions"
import { Box, Title } from "@mantine/core"

export const LatestProducts = () => {
	const { data: products, isSuccess, isLoading } = useGetLatestProducts()

	return (
		<Box my="xl">
			<Title mb="xl" order={2}>
				sản phẩm mới
			</Title>
			<ProductList
				products={products}
				isLoading={isLoading}
				isSuccess={isSuccess}
				limit={12}
			/>
		</Box>
	)
}
