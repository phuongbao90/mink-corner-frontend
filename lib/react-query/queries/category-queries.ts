import { useQuery } from "@tanstack/react-query"
import { request } from "lib/api"
import { Category } from "lib/types"
import { categoryKeys } from "../queryKeys"

export const useFetchCategoriesQuery = () => {
	return useQuery<Category[], Error>({
		queryKey: categoryKeys.all,
		queryFn: async () =>
			await request({
				url: "/products/categories",
				method: "GET",
			}),
	})
}
