import { GetStaticProps } from "next"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { BannerHome } from "@/components/banner-home"
import { Box, Container, MediaQuery, Space } from "@mantine/core"
import { bannerNames } from "@/constant"
import { appKeys, getAppConfigs, getSeoMeta } from "@/features/app"
import { bannerKeys, getBanner, useGetBanner } from "@/features/banners"
import { getLatestProducts, productKeys } from "@/features/products" // import { BannerBasic } from "@/components"
import { LatestProducts } from "@/features/products/templates/latest-products"
import { HomePageHead } from "@/components/Head/home-page-head"
import dynamic from "next/dynamic"

const DynamicFeaturedProducts = dynamic(() =>
	import("@/features/products").then((comp) => comp.FeaturedProducts)
)
const DynamicBannerBasic = dynamic(() =>
	import("@/components").then((comp) => comp.BannerBasic)
)

export default function HomePage() {
	const { data: banner } = useGetBanner(bannerNames.banner_home_mid)

	return (
		<>
			<HomePageHead />
			<div>
				<BannerHome />

				<Container mt="xl" size="xl">
					<LatestProducts />
				</Container>

				<Space py="md" />
				<Box
					sx={(theme) => ({
						minHeight: 390,
						display: "flex",
					})}
				>
					<DynamicBannerBasic banner={banner} />
				</Box>
				<Space my="xl" />

				<MediaQuery
					largerThan="xs"
					styles={{
						display: "none",
					}}
				>
					<Box>
						<DynamicFeaturedProducts />
					</Box>
				</MediaQuery>

				<MediaQuery
					smallerThan="xs"
					styles={{
						display: "none",
					}}
				>
					<Container size="xl">
						<DynamicFeaturedProducts />
					</Container>
				</MediaQuery>
			</div>
		</>
	)
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(appKeys.configs, getAppConfigs)
	await queryClient.prefetchQuery(
		bannerKeys.detail(bannerNames.homeTopBanner),
		() => getBanner(bannerNames.homeTopBanner)
	)

	await queryClient.prefetchQuery(
		productKeys.latest_products(),
		getLatestProducts
	)
	await queryClient.prefetchQuery(appKeys.seoMeta("/home"), () =>
		getSeoMeta("/home")
	)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	}
}
