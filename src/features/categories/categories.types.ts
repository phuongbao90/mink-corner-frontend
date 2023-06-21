import { PromotionItemType } from "@/features/promotion"
import { CoverImage, Status } from "@/types"

export type Category = {
	id: string
	category_name: string
	category_slug: string
	order: number | null
	cover_image: CoverImage
	icon: {
		id: string
	} | null
	parent_category_id?: {
		id: string
		category_name: string
		category_slug: string
	} | null
	promotion_item_id?: PromotionItemType | undefined | null
	status: Status
	// promotion_item_id?: {
	// 	id: string
	// 	title: string
	// 	type: string
	// 	percentage_rate: number
	// 	fixed_amount: number
	// 	status: Status
	// }
}
