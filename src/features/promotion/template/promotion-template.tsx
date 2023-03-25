import { ProductList } from "@/components"
import { useGetInfiniteProducts } from "@/features/products"
import { PromotionType } from "@/features/promotion"
import {
	Box,
	Button,
	Center,
	Container,
	Loader,
	Space,
	Title,
	rem,
} from "@mantine/core"

const LIMIT = 12

export const PromotionTemplate = ({
	promotions,
}: {
	promotions: PromotionType[] | undefined
}) => {
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
		data: infiniteData,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
		isLoading,
		isSuccess,
	} = useGetInfiniteProducts(
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
		<Container size="xl" my={60} mih="50dvh">
			<Title order={1} size="h2" align="center">
				Sản phẩm đang giảm giá
			</Title>
			<Space my={{ base: 24, xs: 40 }} />
			<ProductList
				products={infiniteData?.pages
					?.map((el) => {
						return el.products
					})
					.flat()}
				isLoading={isLoading}
				isSuccess={isSuccess}
				limit={LIMIT}
				span={{
					base: 6,
					xs: 3,
					sm: 2,
				}}
			/>

			{isFetchingNextPage && (
				<Box my={rem(50)}>
					<Center>
						<Loader variant="dots" size="lg" />
					</Center>
				</Box>
			)}

			{hasNextPage && (
				<Center my="xl">
					<Button
						onClick={() => fetchNextPage()}
						disabled={!hasNextPage || isFetchingNextPage}
					>
						{isFetchingNextPage ? "Loading ..." : "Xem thêm"}
					</Button>
				</Center>
			)}
		</Container>
	)
}
