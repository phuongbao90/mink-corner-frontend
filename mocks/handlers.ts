// import { getApiUrl } from "./helpers/getApiUrl"
import { rest } from "msw"
import { placeholder_products } from "./placeholders"
import { placeholder_categories } from "./placeholders/placeholder-category-list"

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
	rest.get("*/products/categories", (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(placeholder_categories))
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
