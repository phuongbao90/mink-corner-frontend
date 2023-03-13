import { GetStaticProps } from "next"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { BannerHome } from "@/components/banner-home"
import { Box, Container, MediaQuery, Space } from "@mantine/core"
import { FeaturedProducts } from "@/features/products"
import { bannerNames } from "@/constant"
import { appKeys, getAppConfigs } from "@/features/app"
import { bannerKeys, getBanner, useGetBanner } from "@/features/banners"
import { getLatestProducts, productKeys } from "@/features/products"
import { BannerBasic } from "@/components"
import { LatestProducts } from "@/features/products/templates/latest-products"

export default function HomePage() {
	const { data: banner } = useGetBanner(bannerNames.banner_home_mid)

	return (
		<div>
			<Box>
				<BannerHome />
			</Box>
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
				<BannerBasic banner={banner} />
			</Box>
			<Space my="xl" />

			<MediaQuery
				largerThan="xs"
				styles={{
					display: "none",
				}}
			>
				<Box>
					<FeaturedProducts />
				</Box>
			</MediaQuery>

			<MediaQuery
				smallerThan="xs"
				styles={{
					display: "none",
				}}
			>
				<Container size="xl">
					<FeaturedProducts />
				</Container>
			</MediaQuery>
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
