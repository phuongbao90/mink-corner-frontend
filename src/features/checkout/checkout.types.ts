import { User } from "@/features/user"
import { Status } from "@/types"

export type ShippingMethod = {
	id: string
	name: string
	price: string
	applicable_to: "only-hcm" | "outside-hcm"
	note?: string
	status: Status
}

export type PaymentType = {
	id: string
	name: string
	value: string
	detail?: string
	status: Status
}

export type OrderItem = {
	id: string
	product_item_id: { id: string }
	quantity: number
	price: string
	// order_id: string
	// status: Status
}

export type UserAddress = {
	id: string
	user: User
	address: string
	city: string
	district: string
	ward: string
	note?: string
	is_default?: string
}

export type Order = {
	id: string
	user: User
	total: string
	status:
		| "waiting_for_approval"
		| "approved"
		| "delivered"
		| "delivered_successfully"
		| "delivered_failed"
		| "denied"
		| "customer_cancelled"
	payment_method: string
	shipping_method: string
	items: OrderItem[]
}

export type CreateOrderData = {
	total: string
	shipping_method: number
	payment_method: number
	shipping_address: Pick<
		UserAddress,
		"address" | "city" | "district" | "ward"
	> & { user: { id: string } }
	user: { id: string }
	items: {
		price: string
		quantity: number
		product_item_id: number
	}[]
}

export type City = {
	id: string
	ten_tinh_thanh: string
}
export type District = {
	id: string
	ten_quan_huyen: string
	province_id: string
}
export type Ward = {
	id: string
	ten_xa_phuong: string
	district_id: string
}
