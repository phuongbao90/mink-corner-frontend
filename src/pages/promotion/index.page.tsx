import { CarouselWrapper, DirectusImage, ProductList } from "@/components"
import { PromotionPageHead } from "@/components/Head/promotion-page-head"
import { appKeys, fetchAppConfigs, getSeoMeta } from "@/features/app"
import { useGetInfiniteProducts } from "@/features/products"
import {
	getPromotions,
	promotionKeys,
	useGetPromotions,
} from "@/features/promotion"
import {
	Box,
	Button,
	Center,
	Container,
	Loader,
	rem,
	Space,
	Stack,
	Text,
	Title,
} from "@mantine/core"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetStaticProps } from "next"

const LIMIT = 12

const PromotionPage = () => {
	const { data: promotions, isSuccess: isPromotionsSuccess } =
		useGetPromotions()
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
		<>
			<PromotionPageHead />
			<Box>
				<Box>
					{isPromotionsSuccess && (
						<CarouselWrapper
							carouselOptions={{
								slidesToScroll: 1,
								draggable: promotions.length > 1 ? true : false,
							}}
							slides={promotions?.map((el) => el.cover_image?.id || "")}
							withDots
						>
							{promotions?.map(
								(promotion, index) =>
									!!promotion.cover_image?.id && (
										<Box
											key={index}
											sx={{
												position: "relative",
												height: "60dvh",
												width: "100%",
												flex: "0 0 100%",
											}}
										>
											<DirectusImage
												src={promotion.cover_image?.id}
												alt="promotion-banner-image"
												sizes="100vw"
												style={{
													filter: "brightness(0.65)",
												}}
											/>
											<Box
												sx={{
													position: "absolute",
													transform: "translate(-50%, -50%)",
													top: "43%",
													left: "50%",
													width: "80%",
												}}
											>
												<Stack>
													<Title
														order={2}
														size={"6vw"}
														c="white"
														sx={{ textAlign: "center" }}
													>
														{promotion.title}
													</Title>
													<Text
														c="white"
														sx={{
															fontSize: "3vw",
															textAlign: "center",
														}}
													>
														{promotion.description}
													</Text>
												</Stack>
											</Box>
										</Box>
									)
							)}
						</CarouselWrapper>
					)}
				</Box>

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
			</Box>
		</>
	)
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(promotionKeys.all, getPromotions)
	await queryClient.prefetchQuery(appKeys.configs, fetchAppConfigs)
	await queryClient.prefetchQuery(appKeys.seoMeta("/promotion"), () =>
		getSeoMeta("/promotion")
	)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	}
}

export default PromotionPage
