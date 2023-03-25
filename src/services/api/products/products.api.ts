import { FetchOptionsType } from "@/features/collections"
import { gql } from "graphql-request"
import {
	GET_PRODUCT,
	GET_COLORS,
	GET_SIZES,
	FILTER_PRODUCTS,
	COUNT_PRODUCT,
	FEATURED_PRODUCTS,
} from "./products.graphql"
import { apiClient } from "@/services/client"
import {
	Product,
	ProductCount,
	Color,
	Size,
	TFeaturedProducts,
} from "@/features/products"
import { JWT_SECRET } from "@/constant"

export async function getProductSlugs() {
	const { slugs } = await apiClient.request<{ slugs: { slug: string }[] }>(
		gql`
			query {
				slugs: product {
					slug
				}
			}
		`,
		{},
		{
			authorization: `Bearer ${JWT_SECRET}`,
		}
	)

	return slugs.map(({ slug }) => slug)
}

/* -------------------------------------------------------------------------- */

export async function filterProducts(
	options: FetchOptionsType
): Promise<Product[]> {
	try {
		const { product } = await apiClient.request<{ product: Product[] }>(
			FILTER_PRODUCTS,
			options,
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		if (!product) return Promise.reject(new Error("products not found"))

		return product
	} catch (error) {
		console.error("filterProducts ", error)
		return Promise.reject(new Error("products not found"))
	}
}

export async function countProducts(
	options: Pick<FetchOptionsType, "filter">
): Promise<number> {
	try {
		const { product_aggregated } = await apiClient.request<{
			product_aggregated: ProductCount
		}>(COUNT_PRODUCT, options, {
			authorization: `Bearer ${JWT_SECRET}`,
		})
		return product_aggregated[0].count.id
	} catch (error) {
		console.error("getProducts ", error)
		return Promise.reject(new Error("products not found"))
	}
}

export async function fetchFeaturedProducts() {
	try {
		const { featured_products } = await apiClient.request<{
			featured_products: TFeaturedProducts
		}>(
			FEATURED_PRODUCTS,
			{},
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		if (!featured_products)
			return Promise.reject(new Error("featured_products not found"))

		return featured_products
	} catch (error) {
		return Promise.reject(new Error(`featured_products not found: ${error}`))
	}
}

/* -------------------------------------------------------------------------- */
export async function getProduct(slug: string | undefined): Promise<Product> {
	try {
		const { product } = await apiClient.request<{ product: [Product] }>(
			GET_PRODUCT,
			{ slug },
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		if (!product) return Promise.reject(new Error("product not found"))

		const _product = product[0]

		return _product
	} catch (error) {
		return Promise.reject(new Error(`product not found: ${error}`))
	}
}

export async function getColors() {
	try {
		const { color } = await apiClient.request<{ color: Color[] }>(
			GET_COLORS,
			{},
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		if (!color) return Promise.reject(new Error("color not found"))

		return color
	} catch (error) {
		return Promise.reject(new Error(`Colors not found: ${error}`))
	}
}
export async function getSizes() {
	try {
		const { size } = await apiClient.request<{ size: Size[] }>(
			GET_SIZES,
			{},
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		if (!size) return Promise.reject(new Error("sizes not found"))

		return size
	} catch (error) {
		return Promise.reject(new Error(`Sizes not found: ${error}`))
	}
}
