import { CATEGORY_FRAGMENT } from "@/services/utils"
import { gql } from "graphql-request"

export const GET_CATEGORY_QUERY = gql`
	query GetCategoryQuery {
		category(sort: ["order"]) {
			...CategoryFields
		}
	}
	${CATEGORY_FRAGMENT}
`
