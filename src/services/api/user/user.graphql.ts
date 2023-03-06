// import { CART_ITEM_FRAGMENT } from "@/services/api/cart"
import { USER_FRAGMENT } from "@/services/utils/graphql.fragments"
import { gql } from "graphql-request"

// export const USER_FRAGMENT = gql`
// 	fragment UserFragment on shopping_user {
// 		id
// 		name
// 		anonymous
// 		device_id
// 		email_address
// 		phone_number
// 		status
// 		cart {
// 			id
// 			device_id
// 			date_created
// 			date_updated
// 			items {
// 				id
// 				quantity
// 				product_item_id {
// 					SKU
// 					cover_image {
// 						id
// 					}
// 					id
// 					images {
// 						directus_files_id {
// 							id
// 						}
// 					}
// 					price
// 					quantity
// 					sort
// 					status
// 					options {
// 						id
// 						variation_id {
// 							id
// 							title
// 							value
// 							status
// 							option_id {
// 								id
// 								title
// 								value
// 								status
// 							}
// 						}
// 					}
// 				}
// 			}
// 			items_func {
// 				count
// 			}
// 		}
// 	}
// `

export const GET_USER_QUERY = gql`
	query GetUserQuery($user_id: ID!) {
		shopping_user: shopping_user_by_id(id: $user_id) {
			id
			name
			anonymous
			device_id
			email_address
			phone_number
			status
			cart {
				id
			}
		}
	}
`

export const CreateShoppingUserMutation = gql`
	mutation CreateShoppingUserMutation {
		shopping_user: create_shopping_user_item(data: { anonymous: true }) {
			...UserFragment
		}
	}
	${USER_FRAGMENT}
`

export const UPDATE_USER = gql`
	mutation UpdateUser($id: ID!, $user_data: update_shopping_user_input!) {
		update_shopping_user_item(id: $id, data: $user_data) {
			...UserFragment
		}
	}
	${USER_FRAGMENT}
`
