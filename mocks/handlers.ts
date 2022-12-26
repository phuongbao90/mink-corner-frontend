// import { getApiUrl } from "./helpers/getApiUrl"
import { rest } from "msw"
import {
	productsResponse,
	placeholder_products,
} from "./placeholders/placeholder-product-list"

export const handlers = [
	rest.get("*/products", (req, res, ctx) => {
		const limit = req.url.searchParams.get("limit") || 30

		return res(
			ctx.status(200),
			ctx.json({
				products: placeholder_products.slice(0, +limit),
				total: 100,
				limit: +limit,
				skip: 0,
			})
		)
	}),
	rest.get("*/products/:productId", (req, res, ctx) => {
		const { productId } = req.params
		const product = placeholder_products.find((el) => el.id === +productId)
		if (!product) {
			return res(ctx.status(404))
		}
		return res(ctx.status(200), ctx.json(product))
	}),
]
