import { gql } from "graphql-request"

import {
	FilterProductsQuery,
	GET_PRODUCT,
	GetProductsQuery,
} from "./products.graphql"
import { isEmpty } from "lodash"
import { apiClient } from "@/services/client"
import { Product } from "@/features"

export async function getProductSlugs() {
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
		const { product } = await apiClient.request<{ product: Product[] }>(
			options ? FilterProductsQuery : GetProductsQuery,
			options
		)

		return product
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
