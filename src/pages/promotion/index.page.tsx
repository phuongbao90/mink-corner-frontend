import { ProductList } from "@/components"
import { useGetFilteredProducts } from "@/features/products"
import { useGetPromotions } from "@/features/promotion"
import { Box, Container } from "@mantine/core"

const LIMIT = 6

const PromotionPage = () => {
	const { data: promotions } = useGetPromotions()
	const SKUs: string[] = []
	const categorySlugs: string[] = []
	let isFinished = false

	promotions?.forEach((promotion, index) => {
		const { items } = promotion

		items?.forEach((item) => {
			const { product_items } = item || {}
			product_items?.forEach((el) => SKUs.push(el.SKU))
			item.categories?.forEach((el) => categorySlugs.push(el.category_slug))
		})

		if (index === promotions.length - 1) {
			isFinished = true
		}
	})

	const {
		data: products,
		isLoading,
		isSuccess,
	} = useGetFilteredProducts(
		isFinished
			? {
					filter: {
						_or: [
							{ product_item: { SKU: { _in: SKUs } } },
							{ category: { category_slug: { _in: categorySlugs } } },
						],
						status: {
							_eq: "published",
						},
					},
					page: 1,
					limit: LIMIT,
					sort: "-date_created",
			  }
			: undefined
	)

	return (
		<Box>
			<Container size="xl">
				<ProductList
					products={products}
					isLoading={isLoading}
					isSuccess={isSuccess}
					limit={LIMIT}
				/>
			</Container>
		</Box>
	)
}

export default PromotionPage
