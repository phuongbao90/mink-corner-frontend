import {
	COLOR_FRAGMENT,
	PRODUCT_FRAGMENT,
	SIZE_FRAGMENT,
} from "@/services/utils/graphql.fragments"
import { gql } from "graphql-request"

export const GET_COLORS = gql`
	query GetColors {
		color(sort: ["order"], filter: { status: { _eq: "published" } }) {
			...ColorFields
		}
	}
	${COLOR_FRAGMENT}
`

export const GET_SIZES = gql`
	query GetSizes {
		size(sort: ["order"], filter: { status: { _eq: "published" } }) {
			...SizeFields
		}
	}
	${SIZE_FRAGMENT}
`

export const COUNT_PRODUCT = gql`
	query CountProduct($filter: product_filter) {
		product_aggregated(filter: $filter) {
			count {
				id
			}
		}
	}
`

export const FILTER_PRODUCTS = gql`
	query FilterProduct(
		$filter: product_filter
		$page: Int!
		$limit: Int!
		$sort: String
	) {
		product(filter: $filter, page: $page, limit: $limit, sort: [$sort]) {
			...ProductFields
		}
	}
	${PRODUCT_FRAGMENT}
`
export const GET_PRODUCT = gql`
	query GetProductQuery($slug: String) {
		product(filter: { slug: { _eq: $slug } }) {
			...ProductFields
		}
	}
	${PRODUCT_FRAGMENT}
`

export const FEATURED_PRODUCTS = gql`
	query FeaturedProducts {
		featured_products {
			enabled
			cover_image {
				id
			}
			products(limit: 10) {
				...ProductFields
			}
		}
	}
	${PRODUCT_FRAGMENT}
`
