import { useQuery } from "@tanstack/react-query"
import { request } from "lib/api"
import { productKeys } from "lib/react-query"
import type { Product } from "lib/types"

export const useGetProductQuery = (id: number) => {
	return useQuery<Product>(
		productKeys.detail(id),
		async () =>
			await request({
				url: `/products/${id}`,
				method: "GET",
			}),
		{
			enabled: Boolean(id),
		}
	)
}
