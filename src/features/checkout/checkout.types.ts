import { User, UserAddress } from "@/features/user"
import { CoverImage, Status } from "@/types"

export type ShippingMethod = {
	id: string
	name: string
	price: string
	applicable_to: "202" | "outside-hcm"
	note?: string
	status: Status
	cover_image: CoverImage
}

export type PaymentType = {
	id: string
	name: string
	value: string
	account_number: string
	account_holder: string
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
	total: number
	shipping_method: number
	payment_method: number
	shipping_address: {
		id?: string
		user: { id: string }
		address: string
		ward: string
		district: string
		city: string
	}

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
