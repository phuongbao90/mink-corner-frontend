import { PROMOTION_ITEM_FRAGMENT } from "@/services"
import { gql } from "graphql-request"

export const GET_PROMOTION = gql`
	query GetPromotion($discount_code: String!) {
		promotion(filter: { discount_code: { _eq: $discount_code } }) {
			id
			title
			cover_image {
				id
			}
			discount_code
			description
			start_date
			end_date
			status
			items {
				...PromotionItemFields
			}
		}
	}
	${PROMOTION_ITEM_FRAGMENT}
`

export const GET_PROMOTIONS = gql`
	query GetPromotions {
		promotion(filter: { status: { _eq: "published" } }) {
			id
			title
			cover_image {
				id
			}
			discount_code
			description
			start_date
			end_date
			status
			items {
				...PromotionItemFields
			}
		}
	}
	${PROMOTION_ITEM_FRAGMENT}
`
