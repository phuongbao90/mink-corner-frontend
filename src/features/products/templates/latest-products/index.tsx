import { ProductList } from "@/components"
import { useGetLatestProducts } from "@/features/products/products.actions"
import { Box, Title } from "@mantine/core"

export const LatestProducts = () => {
	const { data: products, isSuccess, isLoading } = useGetLatestProducts()

	return (
		<Box my="xl">
			<Title mb="xl" order={2} tt="capitalize">
				sản phẩm mới
			</Title>
			<ProductList
				products={products}
				isLoading={isLoading}
				isSuccess={isSuccess}
				limit={12}
				span={{
					base: 6,
					xs: 3,
					lg: 2,
				}}
			/>
		</Box>
	)
}
