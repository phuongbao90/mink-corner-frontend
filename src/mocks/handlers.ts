import { AddCartItemProps } from "@/features/cart"
import { UpdateCartItemPropType } from "@/services"
import { graphql, rest } from "msw"
import { placeholder_data } from "./placeholders"
import { apiRoutes } from "../constant/index"

export const handlers = [
	/* ----------------------------- GRAPHQL QUERIES ---------------------------- */

	graphql.query("GetProductsQuery", (req, res, ctx) => {
		return res(ctx.status(200), ctx.data({ product: placeholder_data.product }))
	}),
	graphql.query("GetProductQuery", (req, res, ctx) => {
		const { slug } = req.variables
		if (!slug || typeof slug !== "string") return res(ctx.status(404))
		const productFound = placeholder_data.product.find((el) => el.slug === slug)
		if (!productFound) return res(ctx.status(404))
		return res(ctx.status(200), ctx.data({ product: [productFound] }))
	}),

	/* ---------------------------- NEXTJS API ROUTE ---------------------------- */

	rest.get(apiRoutes.user, (req, res, ctx) => {
		const user_id = req.url.searchParams.get("user_id")
		const userFound = placeholder_data.shopping_user.id === user_id

		if (userFound)
			return res(ctx.status(200), ctx.json(placeholder_data.shopping_user))

		return res(ctx.status(404))
	}),

	rest.get(apiRoutes.cart, (req, res, ctx) => {
		const cart_id = req.url.searchParams.get("cart_id")

		const cartFound = placeholder_data.shopping_cart_by_id.id === cart_id

		if (cartFound) {
			return res(
				ctx.status(200),
				ctx.json(placeholder_data.shopping_cart_by_id)
			)
		}

		return res(ctx.status(404))
	}),

	rest.post(apiRoutes.cart, async (req, res, ctx) => {
		const cart_id = req.url.searchParams.get("cart_id")
		const { product_item_id, quantity } = (await req.json()) as AddCartItemProps

		const cartFound = placeholder_data.shopping_cart_by_id.id === cart_id

		const productItemFound = placeholder_data.product_item.find(
			(el) => +el.id === product_item_id
		)

		if (cartFound && productItemFound) {
			let updatedCart = placeholder_data.shopping_cart_by_id
			updatedCart.items?.unshift({
				id: `${Math.random()}`,
				quantity,
				date_created: new Date(),
				date_updated: null,
				product_item_id: productItemFound,
			})

			updatedCart.items_func.count = updatedCart.items_func.count + 1

			return res(ctx.status(200), ctx.json(updatedCart))
		}

		return res(ctx.status(404))
	}),
	rest.patch(apiRoutes.cart, async (req, res, ctx) => {
		const { cart_item_id, quantity } =
			(await req.json()) as UpdateCartItemPropType

		if (!cart_item_id || !quantity) {
			return res(ctx.status(404))
		}

		let updatedCart = placeholder_data.shopping_cart_by_id
		updatedCart.items?.map((item) => {
			if (item.id === cart_item_id) {
				item.quantity = quantity
				item.date_updated = new Date()
			}

			return item
		})

		return res(ctx.status(200), ctx.json(updatedCart))
	}),
	rest.delete(apiRoutes.cart, async (req, res, ctx) => {
		const cart_item_id = req.url.searchParams.get("cart_item_id")
		if (!cart_item_id) {
			return res(ctx.status(404))
		}

		const updatedCart = placeholder_data.shopping_cart_by_id
		const filteredItems = placeholder_data.shopping_cart_by_id.items?.filter(
			(item) => item.id !== cart_item_id
		)
		if (filteredItems) {
			updatedCart.items = filteredItems
			updatedCart.items_func.count = updatedCart.items_func.count - 1
		}

		return res(ctx.status(200), ctx.json(updatedCart))
	}),

	rest.get(apiRoutes.categories, async (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(placeholder_data.category))
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
