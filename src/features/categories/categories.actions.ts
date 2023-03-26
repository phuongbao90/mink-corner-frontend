import { category_initial_data } from "./categories.data"
import { Category } from "@/features/categories"
import { useQuery } from "@tanstack/react-query"
import { fetcher } from "@/services"
import { apiRoutes } from "@/constant"

export const categoryKeys = {
	all: [{ scope: "category" }, { type: "list" }],
}

export const fetchCategories = () => {
	return fetcher<Category[]>({
		url: apiRoutes.categories,
		params: {},
	})
}

export const useGetCategories = () => {
	return useQuery<Category[], Error>({
		queryKey: categoryKeys.all,
		queryFn: fetchCategories,
		initialData: category_initial_data,
	})
}
