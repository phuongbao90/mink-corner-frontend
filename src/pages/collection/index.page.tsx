import { CollectionTemplate } from "@/features/collections"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetStaticProps } from "next"
import { categoryKeys, fetchCategories } from "@/features/categories"
import { getColors } from "@/features/products"
import { appKeys, fetchAppConfigs, getSeoMeta } from "@/features/app"
import { CollectionPageHead } from "@/components/Head/collection-page-head"

function CollectionPage() {
	return (
		<>
			<CollectionPageHead />
			<CollectionTemplate />
		</>
	)
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(appKeys.configs, fetchAppConfigs)
	await queryClient.prefetchQuery(appKeys.seoMeta("/collection"), () =>
		getSeoMeta("/collection")
	)
	await queryClient.prefetchQuery(categoryKeys.all, () => fetchCategories())
	await queryClient.prefetchQuery([{ scope: "colors" }], getColors)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default CollectionPage
