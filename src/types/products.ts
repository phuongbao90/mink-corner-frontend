import { Category } from "./categories"
import { Status } from "./general"

export type DirectusImage = {
	file: {
		id: string
	}
}

export type VariationItem = {
	value: string
	slug: string
	option: VariationKind
}

export type VariationKind = {
	name: string
	slug: string
}

export type ProductItem = {
	id: string
	SKU: string
	price: string
	quantity: number
	status: Status
	variant?: VariationItem
	cover_image?: null | {
		id: string
	}
	images?: DirectusImage[]
}

export type Product = {
	id: string
	name: string
	slug: string
	description: string
	share_images: boolean

	cover_image: {
		id: string
	}
	images: DirectusImage[]
	category: Category
	product_item: {
		product_variant: ProductItem
	}[]
}

export type ProductImage = DirectusImage[]
