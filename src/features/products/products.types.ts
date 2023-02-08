import { Category } from "@/features/categories"
import { Status } from "@/types"

export type DirectusImage = {
	directus_files_id: {
		id: string
	}
}

export type VariationItem = {
	value: string
	slug: string
	variation: VariationKind
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
	variant: VariationItem | null
	cover_image: null | {
		id: string
	}
	images: DirectusImage[]
	product: {
		id: string
		cover_image: {
			id: string
		}
		images: DirectusImage[]
	}
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
		product_item_id: ProductItem
	}[]
}

export type ProductImage = DirectusImage[]
