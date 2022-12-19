import { useQuery } from "@tanstack/react-query"
import { apiClient, request } from "lib/api"

import { productKeys } from "../queryKeys"

type Product = {
	name: string
	price: number
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
