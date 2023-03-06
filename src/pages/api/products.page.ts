import { FetchOptionsType } from "@/features/collections"
import { Product } from "@/features/products"
import * as productAPI from "@/services/api/products"
import type { NextApiRequest, NextApiResponse } from "next"
import qs from "qs"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Product[] | { error: string }>
) {
	// @ts-ignore
	const options: FetchOptionsType = qs.parse(req.query)
	options.limit = +options.limit
	options.page = +options.page

	if (req.method === "GET") {
		const products = await productAPI.filterProducts(options)
		if (!products) {
			return res.status(404).json({ error: `products  not found` })
		}
		return res.status(200).json(products)
	}
}

export default handler
