import { AddCartItemProps } from "@/features"
import { graphql, rest } from "msw"
import {
	placeholder_product,
	placeholder_shopping_user_by_id,
	placeholder_shopping_cart_by_id,
	placeholder_product_item,
} from "./placeholders"

export const handlers = [
	/* ----------------------------- GRAPHQL QUERIES ---------------------------- */

	graphql.query("GetProductsQuery", (req, res, ctx) => {
		return res(ctx.status(200), ctx.data(placeholder_product))
	}),
	graphql.query("GetProductQuery", (req, res, ctx) => {
		const { slug } = req.variables
		if (!slug || typeof slug !== "string") return res(ctx.status(404))
		const productFound = placeholder_product.product.find(
			(el) => el.slug === slug
		)
		if (!productFound) return res(ctx.status(404))
		return res(ctx.status(200), ctx.data({ product: [productFound] }))
	}),

	/* ---------------------------- NEXTJS API ROUTE ---------------------------- */
	// rest.get(`${process.env.PROJECT_URL}/api/user`, (req, res, ctx) => {
	rest.get(`/api/user`, (req, res, ctx) => {
		const user_id = JSON.parse(String(req.url.searchParams.get("user_id")))
		const userFound =
			placeholder_shopping_user_by_id.shopping_user.id === user_id

		if (userFound)
			return res(
				ctx.status(200),
				ctx.json(placeholder_shopping_user_by_id.shopping_user)
			)

		return res(ctx.status(404))
	}),
	// rest.get(`${process.env.PROJECT_URL}/api/cart`, (req, res, ctx) => {
	rest.get(`/api/cart`, (req, res, ctx) => {
		const cart_id = req.url.searchParams.get("cart_id")

		const cartFound =
			placeholder_shopping_cart_by_id.shopping_cart_by_id.id === cart_id

		if (cartFound)
			return res(
				ctx.status(200),
				ctx.json(placeholder_shopping_cart_by_id.shopping_cart_by_id)
			)

		return res(ctx.status(404))
	}),
	rest.post(`/api/cart`, async (req, res, ctx) => {
		const cart_id = req.url.searchParams.get("cart_id")
		const { product_item_id, quantity } = (await req.json()) as AddCartItemProps

		const cartFound =
			placeholder_shopping_cart_by_id.shopping_cart_by_id.id === cart_id

		const productItemFound = placeholder_product_item.product_item.find(
			(el) => +el.id === product_item_id
		)

		if (cartFound && productItemFound) {
			let updatedCart = placeholder_shopping_cart_by_id
			updatedCart.shopping_cart_by_id.items?.push({
				id: `${Math.random()}`,
				quantity,
				product_item_id: productItemFound,
			})

			updatedCart.shopping_cart_by_id.items_func.count =
				updatedCart.shopping_cart_by_id.items_func.count + 1

			return res(ctx.status(200), ctx.json(updatedCart))
		}

		return res(ctx.status(404))
	}),
	//-----
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
