import { useQuery } from "@tanstack/react-query"
import { apiClient, request } from "lib/api"

import { productKeys } from "../queryKeys"

export interface Product {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images?: string[] | null
}

type ProductsResponse = {
	products: Product[]
	limit: number
	skip: number
	total: number
}

export function useGetProducts() {
	return useQuery<ProductsResponse, Error>(
		productKeys.list(),
		async () =>
			await request({
				url: "/products",
				method: "GET",
			})
	)
}

export function useGetHomePageProducts() {
	return useQuery<ProductsResponse, Error>(
		productKeys.list(),
		async () =>
			await request({
				url: "/products?limit=8",
				method: "GET",
				params: {
					limit: 8,
				},
			})
	)
}
