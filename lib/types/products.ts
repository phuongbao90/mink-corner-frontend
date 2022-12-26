export interface Product {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images?: string[] | null
}

export type ProductsResponse = {
	products: Product[]
	limit: number
	skip: number
	total: number
}
