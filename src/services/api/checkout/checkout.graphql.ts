import {
	ADDRESS_FRAGMENT,
	ORDER_FRAGMENT,
	SHIPPING_METHOD_FRAGMENT,
} from "@/services/utils/graphql.fragments"
import { gql } from "graphql-request"

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
			...ShippingMethodFragment
		}
	}
	${SHIPPING_METHOD_FRAGMENT}
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
