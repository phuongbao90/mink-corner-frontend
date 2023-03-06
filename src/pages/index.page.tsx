import { ProductList } from "@/components/product/ProductList"
import { GetServerSideProps, GetStaticProps } from "next"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { BannerHome } from "@/components/banner-home"
import { Box, Container, Space } from "@mantine/core"
import { FeaturedProducts } from "@/features/products"
import { apiRoutes, bannerNames } from "@/constant"
import { appKeys, getAppConfigs } from "@/features/app"
import { bannerKeys, getBanner, useGetBanner } from "@/features/banners"
import { getLatestProducts, productKeys } from "@/features/products"
import { BannerBasic } from "@/components"

export default function HomePage() {
	const { data: banner } = useGetBanner(bannerNames.banner_home_mid)

	return (
		<div>
			<Box>
				<BannerHome />
			</Box>
			<Container mt="xl" size="lg">
				<ProductList />
			</Container>
			<Space my="xl" />
			<Box
				sx={(theme) => ({
					minHeight: 390,
					display: "flex",
				})}
			>
				<BannerBasic banner={banner} />
			</Box>
			<Space my="xl" />
			<FeaturedProducts />
		</div>
	)
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(appKeys.all, getAppConfigs)
	await queryClient.prefetchQuery(
		bannerKeys.detail(bannerNames.homeTopBanner),
		() => getBanner(bannerNames.homeTopBanner)
	)

	await queryClient.prefetchQuery(
		productKeys.latest_products(),
		getLatestProducts
	)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	}
}

// export const getServerSideProps: GetServerSideProps = (
// 	async (context) => {
// 		console.log("context", context.req.session)
// 		return {
// 			props: {},
// 		}
// 	}
// )
