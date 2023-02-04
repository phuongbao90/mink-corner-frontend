export type Category = {
	id: string
	name: string
	slug: string
	parent?: {
		id: string
		name: string
		slug: string
	}
}
