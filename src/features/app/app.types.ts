export type ProductDetailPolicy = {
	order: number
	title: string
	subtitle: string
	icon_id: string
}
export type OwnerPaymentInfo = {
	account_name: string
	bank_name: string
	account_number: string
	bank_code: string
}

export type AppConfig = {
	id: string
	product_detail_policies: ProductDetailPolicy[]
	is_freeship_program_on: boolean
	freeship_target: string
	freeship_limit: string
	momo_phone_number: string
	owner_name: string
	owner_phone_number: string
	is_momo_payment_enabled: boolean
	owner_payment_info: OwnerPaymentInfo[]
	facebook_url: string
	instagram_url: string
	owner_email: string
	store_address: string
}

export type AppNotification = {
	type: "success" | "info" | "error" | "warning"
	message: string
	id: string
	title?: string
}

export type Promotion = {}
