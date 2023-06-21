import {
	CART_ITEM_FRAGMENT,
	PRODUCT_ITEM_FRAGMENT,
} from "@/services/utils/graphql.fragments"
import { gql } from "graphql-request"

// export const CART_ITEM_FRAGMENT = gql`
// 	fragment CartItemFields on shopping_cart_item {
// 		id
// 		quantity
// 		date_created
// 		date_updated
// 		product_item_id {
// 			...ProductItemFields
// 		}
// 	}
// 	${PRODUCT_ITEM_FRAGMENT}
// `

export const GET_CART_BY_CART_ID = gql`
	query GetCartByCartId($cart_id: ID!) {
		shopping_cart_by_id(id: $cart_id) {
			id
			device_id
			date_created
			date_updated
			items(sort: ["-date_created"]) {
				...CartItemFields
			}
			items_func {
				count
			}
		}
	}
	${CART_ITEM_FRAGMENT}
`

export const CREATE_CART_MUTATION = gql`
	mutation CreateCart($data: create_shopping_cart_input!) {
		create_shopping_cart_item(data: $data) {
			id
			device_id
			date_created
			date_updated
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
				...ProductItemFields
			}
		}
	}
	${PRODUCT_ITEM_FRAGMENT}
`

export const UPDATE_CART_ITEM_MUTATION = gql`
	mutation updateCartItemMutation($quantity: Int, $cart_item_id: ID!) {
		cart_item: update_shopping_cart_item_item(
			data: { quantity: $quantity }
			id: $cart_item_id
		) {
			...CartItemFields
		}
	}
	${CART_ITEM_FRAGMENT}
`

export const REMOVE_CART_ITEM_MUTATION = gql`
	mutation removeCartItemMutation($cart_item_id: ID!) {
		cart_item: delete_shopping_cart_item_item(id: $cart_item_id) {
			id
		}
	}
`

export const GET_CART_BY_USER_ID = gql`
	query GetCartByUserId($user_id: String!) {
		shopping_cart(filter: { user: { id: { _eq: $user_id } } }) {
			id
			device_id
			date_created
			date_updated
			items(sort: ["-date_created"]) {
				...CartItemFields
			}
			items_func {
				count
			}
		}
	}
	${CART_ITEM_FRAGMENT}
`

export const CLEAR_CART = gql`
	mutation ClearCart($cart_id: ID!) {
		update_shopping_cart_item(id: $cart_id, data: { items: [] }) {
			id
			device_id
			date_created
			date_updated
			items(sort: ["-date_created"]) {
				...CartItemFields
			}
			items_func {
				count
			}
		}
	}
	${CART_ITEM_FRAGMENT}
`
