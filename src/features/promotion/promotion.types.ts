import { Category } from "@/features/categories"
import { ProductItem } from "@/features/products"
import { CoverImage, Status } from "@/types"

export type PromotionItemType = {
	id: string
	title?: string
	type: "percentage" | "amount"
	percentage_rate: number | null
	fixed_amount: number | null
	status: Status
	product_items: ProductItem[]
	categories: Category[]
}

export type PromotionType = {
	id: string
	title: string
	discount_code: string
	description: string
	start_date: string | Date
	end_date: string | Date
	status: Status
	items: PromotionItemType[]
	cover_image: CoverImage
}
