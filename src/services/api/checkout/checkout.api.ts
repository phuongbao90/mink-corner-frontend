import {
	CREATE_ORDER,
	GET_CITIES,
	GET_DISTRICTS,
	GET_ORDER,
	GET_ORDERS,
	GET_PAYMENT_TYPES,
	GET_SHIPPING_METHODS,
	GET_WARDS,
} from "./checkout.graphql"
import {
	City,
	CreateOrderData,
	District,
	Order,
	PaymentType,
	ShippingMethod,
	Ward,
} from "@/features/checkout"
import { JWT_SECRET } from "@/constant"
import { apiClient } from "@/services"

export const fetchCities = async () => {
	try {
		const { tinh_thanh } = await apiClient.request<{
			tinh_thanh: City[]
		}>(GET_CITIES, {}, { authorization: `Bearer ${JWT_SECRET}` })

		return tinh_thanh
	} catch (error) {
		console.error("checkout.api.ts - fetchCities -> ", error)
		return Promise.reject(new Error(`checkout.api.ts -> cities not found`))
	}
}

export const fetchDistricts = async (province_id?: string) => {
	if (!province_id) {
		return Promise.reject(
			new Error(`Invalid province_id supplied: ${JSON.stringify(province_id)}`)
		)
	}

	try {
		const { quan_huyen } = await apiClient.request<{
			quan_huyen: District[]
		}>(
			GET_DISTRICTS,
			{ province_id },
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return quan_huyen
	} catch (error) {
		console.error("checkout.api.ts - fetchDistricts -> ", error)
		return Promise.reject(new Error(`checkout.api.ts -> districts not found`))
	}
}
export const fetchWards = async (district_id?: string) => {
	if (!district_id) {
		return Promise.reject(
			new Error(`Invalid district_id supplied: ${JSON.stringify(district_id)}`)
		)
	}

	try {
		const { phuong_xa } = await apiClient.request<{
			phuong_xa: Ward[]
		}>(GET_WARDS, { district_id }, { authorization: `Bearer ${JWT_SECRET}` })

		return phuong_xa
	} catch (error) {
		console.error("checkout.api.ts - fetchWards -> ", error)
		return Promise.reject(new Error(`checkout.api.ts -> wards not found`))
	}
}

export const fetchShippingMethods = async () => {
	try {
		const { shipping_method } = await apiClient.request<{
			shipping_method: ShippingMethod[]
		}>(GET_SHIPPING_METHODS, {}, { authorization: `Bearer ${JWT_SECRET}` })

		return shipping_method
	} catch (error) {
		console.error("checkout.api.ts - fetchShippingMethods -> ", error)
		return Promise.reject(
			new Error(`checkout.api.ts -> shipping methods not found`)
		)
	}
}
export const fetchPaymentTypes = async () => {
	try {
		const { payment_type } = await apiClient.request<{
			payment_type: PaymentType[]
		}>(GET_PAYMENT_TYPES, {}, { authorization: `Bearer ${JWT_SECRET}` })

		return payment_type
	} catch (error) {
		console.error("checkout.api.ts - fetchPaymentTypes -> ", error)
		return Promise.reject(
			new Error(`checkout.api.ts -> payment types not found`)
		)
	}
}
export const createOrder = async (order_data: CreateOrderData) => {
	if (!order_data) {
		return Promise.reject(
			new Error(`Invalid order_data supplied: ${JSON.stringify(order_data)}`)
		)
	}
	try {
		const { create_order_item } = await apiClient.request<{
			create_order_item: Order
		}>(
			CREATE_ORDER,
			{
				order_data,
			},
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return create_order_item
	} catch (error) {
		console.error("checkout.api.ts - createOrder -> ", error)
		return Promise.reject(
			new Error(`checkout.api.ts -> failed to create new order`)
		)
	}
}
export const fetchOrder = async (order_id: string) => {
	if (!order_id) {
		return Promise.reject(
			new Error(`Invalid order_id supplied: ${JSON.stringify(order_id)}`)
		)
	}
	try {
		const { order_by_id } = await apiClient.request<{
			order_by_id: Order
		}>(
			GET_ORDER,
			{
				order_id,
			},
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return order_by_id
	} catch (error) {
		console.error("checkout.api.ts - fetchOrder -> ", error)
		return Promise.reject(
			new Error(`checkout.api.ts -> failed to fetch order by order_id`)
		)
	}
}
export const fetchOrders = async (user_id: string) => {
	if (!user_id) {
		return Promise.reject(
			new Error(`Invalid user_id supplied: ${JSON.stringify(user_id)}`)
		)
	}
	try {
		const { order } = await apiClient.request<{
			order: Order[]
		}>(
			GET_ORDERS,
			{
				user_id,
			},
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return order
	} catch (error) {
		console.error("checkout.api.ts - fetchOrders -> ", error)
		return Promise.reject(
			new Error(`checkout.api.ts -> failed fetch orders with user_id`)
		)
	}
}
