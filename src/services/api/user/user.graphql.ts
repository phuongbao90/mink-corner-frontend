import { USER_FRAGMENT } from "@/services/utils/graphql.fragments"
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
