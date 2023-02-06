export type Category = {
	id: string
	category_name: string
	category_slug: string
	parent?: {
		id: string
		category_name: string
		category_slug: string
	}
}
