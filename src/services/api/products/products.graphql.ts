import { gql } from "graphql-request"
export const VARIATION_FRAGMENT = gql`
	fragment VARIATION_FRAGMENT on variation_type {
		id
		slug
		value
		variation {
			id
			name
			slug
		}
	}
`

export const BASIC_PRODUCT_FRAGMENT = gql`
	fragment BASIC_PRODUCT_FRAGMENT on product {
		id
		name
		cover_image {
			id
		}
		images {
			directus_files_id {
				id
			}
		}
	}
`

export const PRODUCT_ITEM_FRAGMENT = gql`
	fragment PRODUCT_ITEM_FRAGMENT on product_item {
		id
		SKU
		price
		quantity
		status
		variant {
			...VARIATION_FRAGMENT
		}
		cover_image {
			id
		}
		images {
			directus_files_id {
				id
			}
		}
		product {
			...BASIC_PRODUCT_FRAGMENT
			# id
			# name
			# cover_image {
			# 	id
			# }
			# images {
			# 	directus_files_id {
			# 		id
			# 	}
			# }
		}
	}
	${VARIATION_FRAGMENT}
	${BASIC_PRODUCT_FRAGMENT}
`

export const PRODUCT_FRAGMENT = gql`
	fragment PRODUCT_FRAGMENT on product {
		id
		name
		slug
		description
		share_images
		cover_image {
			id
		}
		images {
			directus_files_id {
				id
			}
		}
		category {
			id
			category_name
			category_slug
		}
		product_item {
			...PRODUCT_ITEM_FRAGMENT
		}
		# product_item {
		# 	id
		# 	SKU
		# 	price
		# 	quantity
		# 	status
		# 	variant {
		# 		value
		# 		slug
		# 		variation {
		# 			name
		# 			slug
		# 		}
		# 	}
		# 	cover_image {
		# 		id
		# 	}
		# 	images {
		# 		directus_files_id {
		# 			id
		# 		}
		# 	}
		# 	product {
		# 		id
		# 		cover_image {
		# 			id
		# 		}
		# 		images {
		# 			directus_files_id {
		# 				id
		# 			}
		# 		}
		# 	}
		# }
	}
	${PRODUCT_ITEM_FRAGMENT}
`

export const GetProductsQuery = gql`
	query GetProductsQuery {
		product {
			...PRODUCT_FRAGMENT
		}
	}
	${PRODUCT_FRAGMENT}
`

export const GET_PRODUCT = gql`
	query GetProductQuery($slug: String) {
		product(filter: { slug: { _eq: $slug } }) {
			...PRODUCT_FRAGMENT
		}
	}
	${PRODUCT_FRAGMENT}
`

export const FilterProductsQuery = gql`
	query FilterProductsQuery($slug: String) {
		product(filter: { slug: { _eq: $slug } }) {
			...PRODUCT_FRAGMENT
		}
	}
	${PRODUCT_FRAGMENT}
`
