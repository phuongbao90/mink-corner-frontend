import { useQuery } from "@tanstack/react-query"
import { apiClient, request } from "lib/api"
import type { ProductsResponse } from "lib/types"

import { productKeys } from "../queryKeys"

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
