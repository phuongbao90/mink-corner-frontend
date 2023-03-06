import { BANNER_ITEM_FRAGMENT } from "@/services"
import { gql } from "graphql-request"

export const GET_BANNER = gql`
	query GetBanner($name: String!) {
		banner(filter: { name: { _eq: $name }, status: { _eq: "published" } }) {
			id
			name
			text_container_position
			title
			subtitle
			status
			start_date
			end_date
			description
			cover_image {
				id
			}
			link {
				id
				collection
				item {
					... on product {
						slug
						cover_image {
							id
						}
					}
					... on promotion {
						id
						slug
					}
					... on category {
						category_slug
						cover_image {
							id
						}
					}
				}
			}
			items(
				sort: ["banner_item_id.order"]
				filter: { banner_item_id: { status: { _eq: "published" } } }
			) {
				banner_item_id {
					...BannerItemFields
				}
			}
		}
	}
	${BANNER_ITEM_FRAGMENT}
`
