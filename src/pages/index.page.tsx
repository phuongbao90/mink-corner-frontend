import { GridBanner, Container } from "@/components"

import { ProductList } from "@/components/product/ProductList"
import { GetServerSideProps, GetStaticProps } from "next"
import { dehydrate, QueryClient } from "@tanstack/react-query"

import { useEffect } from "react"

import { productKeys } from "@/features"
import { getProducts } from "@/services"

export const getStaticProps: GetStaticProps = async (ctx) => {
	const queryClient = new QueryClient()
	await queryClient.prefetchQuery(productKeys.list(), () => getProducts())
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

export default function HomePage() {
	// useEffect(() => {
	// 	async function fetchData() {
	// 		const res = await fetch("/api/user")
	// 		const data = await res.json()
	// 	}
	// 	fetchData()
	// }, [])

	return (
		<div className="w-full">
			<GridBanner />
			<Container>
				<ProductList />
			</Container>
		</div>
	)
}
