import { API_URL } from "@/constant"
import { graphql } from "msw"
import { data_placeholder_products } from "./placeholders"
import { data_shopping_cart } from "./placeholders/placeholder-cart"
import { data_shopping_users } from "./placeholders/placeholder-users"

const minkCorderAPI = graphql.link(API_URL)

export const handlers = [
	minkCorderAPI.query("GetProductsQuery", (req, res, ctx) => {
		return res(ctx.status(200), ctx.data(data_placeholder_products))
	}),
	minkCorderAPI.query("GetProductQuery", (req, res, ctx) => {
		const { slug } = req.variables
		if (!slug || typeof slug !== "string") return res(ctx.status(404))
		const product = data_placeholder_products.products.find(
			(el) => el.slug === slug
		)
		if (!product) return res(ctx.status(404))
		return res(ctx.status(200), ctx.data({ product: [product] }))
	}),
	minkCorderAPI.query("GetShoppingCartQuery", (req, res, ctx) => {
		const { device_id } = req.variables
		if (!device_id || typeof device_id !== "string") return res(ctx.status(404))
		const shopping_cart = data_shopping_cart.shopping_cart.find(
			(el) => el.user_id.device_id === device_id
		)
		if (!shopping_cart) return res(ctx.status(404))
		return res(ctx.status(200), ctx.data({ shopping_cart: [shopping_cart] }))
	}),
	// minkCorderAPI.query("GetShoppingUserQuery", (req, res, ctx) => {
	// 	const { device_id } = req.variables
	// 	if (!device_id || typeof device_id !== "string") return res(ctx.status(404))
	// 	const shopping_user = data_shopping_users.shopping_user.find(
	// 		(el) => el.device_id === device_id
	// 	)
	// 	if (!shopping_user) return res(ctx.status(404))
	// 	return res(ctx.status(200), ctx.data({ shopping_user: [shopping_user] }))
	// }),
	// minkCorderAPI.mutation("CreateShoppingUserMutation", (req, res, ctx) => {
	// 	const { device_id } = req.variables
	// 	if (!device_id || typeof device_id !== "string") return res(ctx.status(500))
	// 	const shopping_user = data_shopping_users.shopping_user.find(
	// 		(el) => el.device_id === device_id
	// 	)
	// 	if (shopping_user) return res(ctx.status(500))
	// 	return res(
	// 		ctx.status(200),
	// 		ctx.data({
	// 			shopping_user: [
	// 				{
	// 					email_address: null,
	// 					id: "5f843025-a030-47ff-858d-07ee0681af45",
	// 					phone_number: null,
	// 					status: "published",
	// 					device_id: device_id,
	// 					cart: [{}, {}],
	// 				},
	// 			],
	// 		})
	// 	)
	// }),
	/* -------------------------------- REST API -------------------------------- */
	// rest.get("*/products", (req, res, ctx) => {
	// 	const limit = req.url.searchParams.get("limit") || 30
	// 	return res(
	// 		ctx.status(200),
	// 		ctx.json({
	// 			products: placeholder_products.slice(0, +limit),
	// 			total: 100,
	// 			limit: +limit,
	// 			skip: 0,
	// 		})
	// 	)
	// }),
	// rest.get("*/products/categories", (req, res, ctx) => {
	// 	return res(ctx.status(200), ctx.json(placeholder_categories))
	// }),
	// rest.get("*/products/:productId", (req, res, ctx) => {
	// 	const { productId } = req.params
	// 	const product = placeholder_products.find((el) => el.id === +productId)
	// 	if (!product) {
	// 		return res(ctx.status(404))
	// 	}
	// 	return res(ctx.status(200), ctx.json(product))
	// }),
]
