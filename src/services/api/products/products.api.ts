import { gql } from "graphql-request"
import { Product } from "@/types"
import { FILTER_PRODUCTS, GET_PRODUCT, GET_PRODUCTS } from "./products.graphql"
import { isEmpty } from "lodash"
import { apiClient } from "@/services/client"

export async function getProductSlugs(slug: string) {
	const { slugs } = await apiClient.request<{ slugs: { slug: string }[] }>(gql`
		query {
			slugs: product {
				slug
			}
		}
	`)

	return slugs.map(({ slug }) => slug)
}

/* -------------------------------------------------------------------------- */

export async function getProducts(options?: any): Promise<Product[]> {
	try {
		const { products } = await apiClient.request<{ products: Product[] }>(
			options ? FILTER_PRODUCTS : GET_PRODUCTS,
			options
		)

		return products
	} catch (error) {
		console.error("getProducts ", error)
		return Promise.reject(new Error("products not found"))
	}
}

/* -------------------------------------------------------------------------- */
export async function getProduct(slug: string | undefined): Promise<Product> {
	try {
		const { product } = await apiClient.request<{ product: [Product] }>(
			GET_PRODUCT,
			{ slug }
		)

		if (!product || isEmpty(product))
			return Promise.reject(new Error("product not found"))

		return product?.[0]
	} catch (error) {
		return Promise.reject(new Error(`product not found: ${error}`))
	}
}

/* ------------------------ WORKING WITH URQL CLIENT ------------------------ */
// export async function getProducts(options?: any) {
// 	try {
// 		const { data } = await apiClient.query(GET_PRODUCTS, {}).toPromise()
// 		console.log(
// 			"🚀 ~ file: product-queries.ts:77 ~ getProducts ~ data",
// 			data?.products?.length
// 		)
// 		if (data && data.products) return data.products
// 	} catch (error) {
// 		console.error("getProducts errors:", error)
// throw new Error()
// 	}
// }
