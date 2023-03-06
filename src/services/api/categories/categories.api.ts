import { JWT_SECRET } from "@/constant"
import { Category } from "@/features/categories"
import { apiClient } from "@/services/client"
import { GET_CATEGORY_QUERY } from "./categories.graphql"

export const getCategories = async () => {
	try {
		const { category } = await apiClient.request<{
			category: Category[]
		}>(GET_CATEGORY_QUERY, {}, { authorization: `Bearer ${JWT_SECRET}` })

		return category
	} catch (error) {
		console.error("categories.api.ts - getCategories -> ", error)
		return Promise.reject(
			new Error(`categories.api.ts -> categories not found`)
		)
	}
}
