import { gql } from "graphql-request"

export const GET_CATEGORY_QUERY = gql`
	query GetCategoryQuery {
		category(sort: ["order"]) {
			id
			category_name
			category_slug
			order
			icon {
				id
			}
			cover_image {
				id
			}
			parent_category_id {
				id
				category_name
				category_slug
			}
		}
	}
`
