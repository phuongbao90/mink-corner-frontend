import { gql } from "graphql-request"
import { product_item_query } from "@/services/api"

export const GetCartQuery = gql`
	query GetCartQuery($cart_id: ID!) {
		shopping_cart_by_id(id: $cart_id) {
			id
			device_id
			date_created
			date_updated
			items {
				id
				quantity
				product_item_id {
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
			}
			items_func {
				count
			}
		}
	}
`

export const AddCartItemMutation = gql`
	mutation AddCartItemMutation(
		$cart_id: ID
		$quantity: Int
		$product_item_id: Int
	) {
		cart_item: create_shopping_cart_item_item(
			data: {
				product_item_id: $product_item_id
				quantity: $quantity
				cart: { id: $cart_id }
			}
		) {
			id
			quantity
			product_item_id {
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
				status
				variant {
					slug
					value
					variation {
						name
						slug
					}
				}
				# ...product_item_query
			}
		}
	}
`
//  mutation RemoveCartItemQuery(){}
//  mutation UpdateCartItemQuantityQuery(){}
//  mutation ClearCartItemsQuery(){}

// export const GetCartItemsQuery = gql`
// 	query GetCartItemsQuery($cart_id: String!) {
// 		shopping_cart_item(filter: { cart: { id: { _eq: $cart_id } } }) {
// 			id
// 			quantity
// 			product_item_id {
// 				id
// 				SKU
// 				cover_image {
// 					id
// 				}
// 				id
// 				images {
// 					directus_files_id {
// 						id
// 					}
// 				}
// 				price
// 				quantity
// 				sort
// 				status
// 				variant {
// 					slug
// 					value
// 					variation {
// 						name
// 						slug
// 					}
// 				}
// 			}
// 		}
// 	}
// `
