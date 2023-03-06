import {
	ADDRESS_FRAGMENT,
	ORDER_FRAGMENT,
} from "@/services/utils/graphql.fragments"
import { gql } from "graphql-request"

// export const ADDRESS_FRAGMENT = gql`
// 	fragment AddressFragment on user_address {
// 		address
// 		city
// 		district
// 		ward
// 		note
// 		is_default
// 		user {
// 			id
// 		}
// 	}
// `
// export const PAYMENT_TYPE_FRAGMENT = gql`
// 	fragment PaymentTypeFragment on payment_type {
// 		id
// 		name
// 		value
// 		detail
// 		status
// 	}
// `
// export const SHIPPING_METHOD_FRAGMENT = gql`
// 	fragment ShippingMethodFragment on shipping_method {
// 		id
// 		name
// 		price
// 		applicable_to
// 		note
// 		status
// 	}
// `
// export const ORDER_ITEM_FRAGMENT = gql`
// 	fragment OrderItemFragment on order_item {
// 		id
// 		product_item_id {
// 			id
// 		}
// 		quantity
// 		price
// 	}
// `
// export const ORDER_FRAGMENT = gql`
// 	fragment OrderFragment on order {
// 		id
// 		total
// 		status
// 		date_created
// 		items {
// 			...OrderItemFragment
// 		}
// 		payment_method {
// 			...PaymentTypeFragment
// 		}
// 		shipping_method {
// 			...ShippingMethodFragment
// 		}
// 		shipping_address {
// 			...AddressFragment
// 		}
// 	}
// 	${ORDER_ITEM_FRAGMENT}
// 	${PAYMENT_TYPE_FRAGMENT}
// 	${SHIPPING_METHOD_FRAGMENT}
// 	${ADDRESS_FRAGMENT}
// `

export const GET_ADDRESS = gql`
	query getAddress($user_id: String!) {
		user_address(filter: { user: { id: { _eq: $user_id } } }) {
			...AddressFragment
		}
	}
	${ADDRESS_FRAGMENT}
`

export const GET_CITIES = gql`
	query GetCities {
		tinh_thanh {
			id
			ten_tinh_thanh
		}
	}
`
export const GET_DISTRICTS = gql`
	query GetDistricts($province_id: String!) {
		quan_huyen(filter: { province_id: { id: { _eq: $province_id } } }) {
			id
			ten_quan_huyen
		}
	}
`
export const GET_WARDS = gql`
	query GetWards($district_id: String!) {
		phuong_xa(filter: { district_id: { id: { _eq: $district_id } } }) {
			id
			ten_xa_phuong
		}
	}
`
export const GET_PAYMENT_TYPES = gql`
	query GetPaymentTypes {
		payment_type {
			id
			value
			name
			detail
		}
	}
`
export const GET_SHIPPING_METHODS = gql`
	query GetShippingMethods {
		shipping_method {
			id
			name
			price
			applicable_to
			note
		}
	}
`
export const CREATE_ADDRESS = gql`
	mutation CreateAddress(
		$user_id: ID!
		$address: String!
		$city: String!
		$district: String!
		$ward: String!
		$note: String
		$is_default: Boolean
	) {
		create_user_address_item(
			data: {
				user: { id: $user_id }
				address: $address
				city: $city
				district: $district
				ward: $ward
				note: $note
				is_default: $is_default
			}
		) {
			...AddressFragment
		}
	}
	${ADDRESS_FRAGMENT}
`

export const GET_ORDERS = gql`
	query GetOrders($user_id: String!) {
		order(filter: { user: { id: { _eq: $user_id } } }) {
			...OrderFragment
		}
	}
	${ORDER_FRAGMENT}
`
export const GET_ORDER = gql`
	query GetOrder($order_id: ID!) {
		order_by_id(id: $order_id) {
			...OrderFragment
		}
	}
	${ORDER_FRAGMENT}
`
export const CREATE_ORDER = gql`
	mutation CreateOrder($order_data: create_order_input!) {
		create_order_item(data: $order_data) {
			id
		}
	}
`
// export const CREATE_ORDER = gql`
// 	mutation CreateOrder {
// 		create_order_item(
// 			data: {
// 				total: "20000"
// 				shipping_method: 1
// 				payment_method: 1
// 				shipping_address: {
// 					address: "44/9"
// 					city: "hcm"
// 					district: "tan phu"
// 					ward: "tan thanh"
// 					user: { id: "19616343-fdd1-4818-afc1-70bbde5edaeb" }
// 				}
// 				items: [{ price: "20000", product_item_id: 1, quantity: 1 }]
//				user: { id: "19616343-fdd1-4818-afc1-70bbde5edaeb" }
// 			}
// 		) {
// 			id
// 		}
// 	}
// `
