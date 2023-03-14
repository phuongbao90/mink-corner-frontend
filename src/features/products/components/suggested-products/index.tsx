import { ProductList } from "@/components"
import { useGetCart } from "@/features/cart"
import { FetchOptionsType } from "@/features/collections"
import { useGetFilteredProducts } from "@/features/products/products.actions"
import { Product } from "@/features/products/products.types"
import { Box, rem, Title } from "@mantine/core"
import { useEffect, useState } from "react"

export const SuggestedProducts = ({ product }: { product: Product }) => {
	const { data: cart, isSuccess: isCartSuccess } = useGetCart()
	const [queryOptions, setQueryOptions] = useState<
		FetchOptionsType | undefined
	>(undefined)

	const {
		data: products,
		isSuccess: isProductSuccess,
		isLoading: isProductLoading,
		isError: isProductError,
	} = useGetFilteredProducts(queryOptions)

	useEffect(() => {
		if (!isCartSuccess) return
		const SKUs = cart.items.map((el) => el.product_item_id.SKU)

		setQueryOptions({
			filter: {
				// no idea how to type this
				// @ts-ignore
				_and: [
					{
						product_item: {
							SKU: {
								_nin: SKUs,
							},
						},
					},
					{
						category: {
							category_slug: {
								_eq: product?.category?.category_slug,
							},
						},
					},
					{
						SKU: {
							_neq: product.SKU,
						},
					},
				],
			},
			sort: "-date_created",
			limit: 8,
			page: 1,
		})
	}, [cart, isCartSuccess, product])

	if (isProductError || isProductLoading) {
		return null
	}

	return (
		<Box mt={60}>
			<Title
				order={3}
				align="center"
				mb={rem(16)}
				c="gray.7"
				sx={(theme) => ({
					fontSize: 16,
					[theme.fn.largerThan("xs")]: {
						fontSize: 22,
					},
				})}
			>
				Sản phẩm liên quan
			</Title>
			<Title
				order={2}
				align="center"
				mb={rem(32)}
				sx={(theme) => ({
					fontSize: 24,
					[theme.fn.largerThan("xs")]: {
						fontSize: 36,
					},
				})}
			>
				Có Thể Bạn Sẽ Thích
			</Title>
			<ProductList
				products={products}
				isLoading={isProductLoading}
				isSuccess={isProductSuccess}
				limit={4}
				span={{
					base: 6,
					xs: 3,
				}}
			/>
		</Box>
	)
}
