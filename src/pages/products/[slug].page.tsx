import React from "react"
import { useRouter } from "next/router"
import { GetStaticPaths, GetStaticProps } from "next"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import { getProduct, getProductSlugs } from "@/services"
import { productKeys, useGetProduct } from "@/features/products"
import { ProductDetailTemplate } from "@/features/products/templates"
import { Head, SkeletonProductDetail } from "@/components"
import { appKeys, getAppConfigs } from "@/features/app"

function ProductDetailPage() {
	let {
		query: { slug },
	} = useRouter()

	const {
		data: product,
		isSuccess,
		isError,
	} = useGetProduct(typeof slug === "string" ? slug : undefined)

	if (isSuccess) {
		return (
			<>
				<Head title={product.name} />
				<ProductDetailTemplate product={product} />
			</>
		)
	}

	if (isError) {
		return <div>Rất tiếc sản phầm này không tồn tại.</div>
	}

	return <SkeletonProductDetail />
}

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = await getProductSlugs()
	const paths = slugs.map((slug) => ({
		params: { slug },
	}))

	return {
		paths,
		fallback: "blocking",
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const queryClient = new QueryClient()
	const { params } = context
	const { slug } = params || {}

	if (!slug || typeof slug !== "string") return { notFound: true }

	try {
		await queryClient.fetchQuery(productKeys.detail(slug), () =>
			getProduct(slug)
		)
	} catch (error) {
		return {
			notFound: true,
		}
	}

	await queryClient.prefetchQuery(appKeys.all, getAppConfigs)

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	}
}

export default ProductDetailPage
