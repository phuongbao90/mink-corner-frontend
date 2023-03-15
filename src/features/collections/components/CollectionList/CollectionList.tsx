import { ProductList } from "@/components"
import { useGetFilteredProducts } from "@/features/products"
import { useCollectionStore } from "@/store/use-collection-store"
import { Center, Stack, Text } from "@mantine/core"
import Image from "next/image"

export const CollectionList = () => {
	const fetchOptions = useCollectionStore((state) => state.fetchOptions)
	const {
		data: products,
		isSuccess,
		isError,
		isLoading,
	} = useGetFilteredProducts(fetchOptions)

	if (isError) {
		return (
			<Center sx={{ position: "relative", height: "75%" }}>
				<Stack align="center">
					<Image
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

	return (
		<ProductList
			products={products}
			isSuccess={isSuccess}
			isLoading={isLoading}
			span={{
				base: 6,
				xs: 4,
				sm: 3,
			}}
			limit={12}
		/>
	)
}
