import { ADDRESS_FRAGMENT, USER_FRAGMENT } from "@/services"
import { gql } from "graphql-request"

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

export const CREATE_USER = gql`
	mutation CreateUser {
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

export const GET_ADDRESS = gql`
	query getAddress($user_id: String!) {
		user_address(filter: { user: { id: { _eq: $user_id } } }) {
			...AddressFragment
		}
	}
	${ADDRESS_FRAGMENT}
`

export const CREATE_ADDRESS_QUERY = gql`
	mutation CreateAddressQuery($data: create_user_address_input!) {
		create_user_address_item(data: $data) {
			...AddressFragment
		}
	}
	${ADDRESS_FRAGMENT}
`
export const REMOVE_ADDRESS_QUERY = gql`
	mutation RemoveAddressQuery($id: ID!) {
		delete_user_address_item(id: $id) {
			id
		}
	}
`
export const UPDATE_ADDRESS_QUERY = gql`
	mutation UpdateAddressQuery($id: ID!, $data: update_user_address_input!) {
		update_user_address_item(id: $id, data: $data) {
			...AddressFragment
		}
	}
	${ADDRESS_FRAGMENT}
`
