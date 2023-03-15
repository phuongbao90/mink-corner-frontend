import { Head } from "@/components"
import { CollectionTemplate } from "@/features/collections"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetStaticProps } from "next"
import { categoryKeys, fetchCategories } from "@/features/categories"
import { getColors } from "@/features/products"
import { appKeys, fetchAppConfigs } from "@/features/app"

function CollectionPage() {
	return (
		<>
			<Head title="Bộ sưu tập" />
			<CollectionTemplate />
		</>
	)
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(appKeys.all, fetchAppConfigs)
	await queryClient.prefetchQuery(categoryKeys.all, () => fetchCategories())
	await queryClient.prefetchQuery([{ scope: "colors" }], getColors)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	}
}

export default CollectionPage
