import { ProductCardSkeleton } from "@/components"
import ProductCard from "@/components/product/ProductCard"
import { useGetFilteredProducts } from "@/features/products"
import { useBoundStore } from "@/store/useStore"
import { Center, Grid, Stack, Text } from "@mantine/core"
import Image from "next/image"

export const CollectionList = () => {
	const fetchOptions = useBoundStore((state) => state.fetchOptions)
	const {
		data: products,
		isSuccess,
		isError,
	} = useGetFilteredProducts(fetchOptions)
	// const isSuccess = false

	if (isError) {
		return (
			<Center sx={{ position: "relative", height: "75%" }}>
				<Stack align="center">
					<Image
						// fill
						src={"/images/no-product-1.png"}
						alt="no-product-found-image"
						width={500}
						height={500}
					/>
					<Text fw={500} fz="xl">
						Không tìm thấy sản phẩm
					</Text>
				</Stack>
			</Center>
		)
	}

	if (isSuccess) {
		return (
			<Grid>
				{products.map((product) => (
					<Grid.Col key={product.id} span={6} md={4} lg={3}>
						<ProductCard product={product} />
					</Grid.Col>
				))}
			</Grid>
		)
	}

	return (
		<Grid>
			{Array(8)
				.fill(undefined)
				.map((el, index) => (
					<Grid.Col key={index} span={6} md={4} lg={3}>
						<ProductCardSkeleton />
					</Grid.Col>
				))}
		</Grid>
	)
}
