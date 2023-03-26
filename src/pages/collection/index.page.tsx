import { CollectionTemplate } from "@/features/collections"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { GetStaticProps } from "next"
import { categoryKeys, fetchCategories } from "@/features/categories"
import { getColors } from "@/features/products"
import { appKeys, fetchAppConfigs, getSeoMeta } from "@/features/app"
import { CollectionPageHead } from "@/components/Head/collection-page-head"
import { pageRoutes } from "@/constant"
import { useCollectionStore } from "@/store/use-collection-store"
import { useEffect } from "react"
import { Container, Title } from "@mantine/core"

function CollectionPage() {
	const resetStore = useCollectionStore((s) => s.actions.reset)

	useEffect(() => {
		return () => {
			resetStore()
		}
	}, [resetStore])

	return (
		<>
			<CollectionPageHead />

			<Container size="xl" my="xl">
				<Title
					my="xl"
					order={1}
					size="h2"
					sx={(theme) => ({
						[theme.fn.smallerThan("xs")]: {
							fontSize: 20,
						},
						[theme.fn.largerThan("xs")]: {
							fontSize: 28,
						},
					})}
					tt="capitalize"
				>
					bộ sưu tập của mink&#39;s corner
				</Title>
				<CollectionTemplate />
			</Container>
		</>
	)
}

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()

	await queryClient.prefetchQuery(appKeys.configs, fetchAppConfigs)
	await queryClient.prefetchQuery(appKeys.seoMeta(pageRoutes.collection), () =>
		getSeoMeta(pageRoutes.collection)
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
