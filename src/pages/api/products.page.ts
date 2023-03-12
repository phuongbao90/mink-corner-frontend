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
	const options: FetchOptionsType = qs.parse(req.query, { depth: 10 })

	options.limit = Number(options.limit || 12)
	options.page = Number(options.page || 1)

	if (req.method === "GET") {
		const products = await productAPI.filterProducts(options)
		if (!products) {
			return res.status(404).json({ error: `products  not found` })
		}
		return res.status(200).json(products)
	}
}

export default handler
