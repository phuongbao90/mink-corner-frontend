import { pageRoutes } from "@/constant"
import { DirectusImages } from "@/types"

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
	postal_code: string
	address_locality: string
	address_region: string
	latitude: string
	longitude: string
	store_name: string
	logo_1_1: {
		id: string
	}
	logo_16_9: {
		id: string
	}
	logo_og: {
		id: string
	}
}

export type AppNotification = {
	type: "success" | "info" | "error" | "warning"
	message: string
	id: string
	title?: string
}

export type Promotion = {}

export type SEOMetaType = {
	page: string
	title: string
	description: string
	og_images: DirectusImages
}

export type OpenGraphType = {
	url: string
	title: string
	description: string
	siteName: string
	images: OpenGraphImageType[]
}

export type OpenGraphImageType = {
	url: string
	width?: number
	height?: number
	alt?: string
	type?: string
}

export type PageRouteValueType =
	| typeof pageRoutes[keyof typeof pageRoutes]
	| "default"
