import { Status } from "@/types"

export type Category = {
	id: string
	category_name: string
	category_slug: string
	status: Status
	order: number | null
	icon: {
		id: string
	} | null
	parent_category_id?: {
		id: string
		category_name: string
		category_slug: string
		status: Status
	} | null
}
