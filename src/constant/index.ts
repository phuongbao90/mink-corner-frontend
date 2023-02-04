export const API_URL = process.env.API_URL as string
export const ENABLE_MOCK = process.env.ENABLE_MOCK === "true"

export const apiRoutes = {
	user: "/api/user",
	cart: "/api/cart",
}

export const pageRoutes = {
	cart: "/cart",
	collection: "/collection",
	order: "/order",
	checkout: "/checkout",
	products: "/products",
}
