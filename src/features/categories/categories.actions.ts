import { useQuery } from "@tanstack/react-query"
import { Category } from "@/types"
import { gql } from "graphql-request"
import { apiClient } from "@/services"

export const categoryKeys = {
	all: [{ scope: "category" }],
	list: (options = {}) => [{ scope: "category", type: "list", ...options }],
}

const graphQuery = gql`
	query {
		category {
			id
			name: category_name
			slug: category_slug
			parent: parent_category_id {
				id
				name: category_name
				slug: category_slug
			}
		}
	}
`

export const useFetchCategoriesQuery = () => {
	return useQuery<Category[], Error>({
		queryKey: categoryKeys.all,
		queryFn: async () => {
			return await apiClient.request(graphQuery)
		},
	})
}
