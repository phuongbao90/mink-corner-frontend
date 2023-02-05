import { gql } from "graphql-request"

export const product_item_query = gql`
	fragment product_item_query on product_item {
		id
		SKU
		cover_image {
			id
		}
		id
		images {
			directus_files_id {
				id
			}
		}
		price
		quantity
		sort
		status
		variant {
			slug
			value
			variation {
				name
				slug
			}
		}
	}
`

export const PRODUCT_FRAGMENT = gql`
	fragment baseProductQuery on product {
		id
		name
		slug
		description
		share_images
		cover_image {
			id
		}
		images {
			file: directus_files_id {
				id
			}
		}
		category {
			id
			name: category_name
			slug: category_slug
		}
		product_item {
			product_variant: product_item_id {
				id
				SKU
				price
				quantity
				status
				variant {
					value
					slug
					option: variation {
						name
						slug
					}
				}
				cover_image {
					id
				}
				images {
					file: directus_files_id {
						id
					}
				}
			}
		}
	}
`

export const GetProductsQuery = gql`
	query GetProductsQuery {
		products: product {
			...baseProductQuery
		}
	}
	${PRODUCT_FRAGMENT}
`

export const GET_PRODUCT = gql`
	query GetProductQuery($slug: String) {
		product(filter: { slug: { _eq: $slug } }) {
			...baseProductQuery
		}
	}
	${PRODUCT_FRAGMENT}
`

export const FilterProductsQuery = gql`
	query FilterProductsQuery($slug: String) {
		products: product(filter: { slug: { _eq: $slug } }) {
			...baseProductQuery
		}
	}
	${PRODUCT_FRAGMENT}
`
