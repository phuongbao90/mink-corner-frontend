import { Status } from "@/types"

export type CategoryLinkItem = {
	id: string
	collection: "category"
	item: {
		category_slug: "string"
		cover_image: {
			id: string
		}
	}
}
export type ProductLinkItem = {
	id: string
	collection: "product"
	item: {
		slug: string
		cover_image: { id: string }
	}
}
export type PromotionLinkItem = {
	id: string
	collection: "promotion"
	item: {
		slug: string
		id: string
	}
}

export type BannerLink = CategoryLinkItem | ProductLinkItem | PromotionLinkItem

export type BannerItem = {
	id: string
	name: string
	order: number
	title: string | null
	subtitle: string | null
	start_date: string | null
	end_date: string | null
	status: Status
	cover_image: {
		id: string
	} | null
	link: [BannerLink]
}
export type Banner = {
	id: string
	name: string
	text_container_position: "left" | "center" | "right"
	title: string | null
	subtitle: string | null
	location: string | null
	status: Status
	start_date: string | null
	end_date: string | null
	description: string | null
	cover_image: {
		id: string
	} | null
	link: [BannerLink]
	items: { banner_item_id: BannerItem }[]
}
