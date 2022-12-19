// import { getApiUrl } from "./helpers/getApiUrl"
import { rest } from "msw"
import { productsResponse } from "./placeholders/placeholder-product-list"

export const handlers = [
	rest.get("*/products", (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(productsResponse))
	}),
]
