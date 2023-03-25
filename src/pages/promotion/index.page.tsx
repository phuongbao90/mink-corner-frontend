import { PromotionPageHead } from "@/components/Head/promotion-page-head"
import { pageRoutes } from "@/constant"
import { appKeys, fetchAppConfigs, getSeoMeta } from "@/features/app"
import {
	getPromotions,
	promotionKeys,
	useGetPromotions,
} from "@/features/promotion"
import { PromotionBanner } from "@/features/promotion/component"
import { PromotionTemplate } from "@/features/promotion/template"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetStaticProps } from "next"

const PromotionPage = () => {
	const { data: promotions } = useGetPromotions()

	return (
		<>
			<PromotionPageHead />
			<PromotionBanner promotions={promotions} />
			<PromotionTemplate promotions={promotions} />
		</>
	)
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(promotionKeys.all, getPromotions)
	await queryClient.prefetchQuery(appKeys.configs, fetchAppConfigs)
	await queryClient.prefetchQuery(appKeys.seoMeta(pageRoutes.promotion), () =>
		getSeoMeta(pageRoutes.promotion)
	)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	}
}

export default PromotionPage
