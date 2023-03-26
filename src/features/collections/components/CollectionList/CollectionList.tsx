import { ProductList } from "@/components"
import { useGetFilteredProducts } from "@/features/products"
import { useCollectionStore } from "@/store/use-collection-store"
import { Box, Center, Stack, Text } from "@mantine/core"
import Image from "next/image"

export const CollectionList = () => {
	const fetchOptions = useCollectionStore((state) => state.fetchOptions)
	const {
		data: products,
		isSuccess,
		isError,
		isLoading,
	} = useGetFilteredProducts(fetchOptions)

	if (isError || products?.length === 0) {
		return (
			<Box
				sx={(theme) => ({
					[theme.fn.largerThan("xs")]: {
						width: "70%",
					},
				})}
			>
				<Box
					sx={(theme) => ({
						aspectRatio: "1.4",
						position: "relative",
					})}
				>
					<Image
						src={"/images/no-product-1.png"}
						alt="no-product-found-image"
						fill
					/>
				</Box>
				<Text fw={500} fz="xl" align="center">
					Không tìm thấy sản phẩm
				</Text>
			</Box>
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
