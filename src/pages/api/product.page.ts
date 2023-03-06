import { Product } from "@/features/products"
import * as productAPI from "@/services/api/products"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Product | { error: string }>
) {
	const { slug } = req.query

	if (req.method === "GET") {
		let _slug = typeof slug === "string" ? slug : undefined

		const product = await productAPI.getProduct(_slug)
		if (!product) {
			return res.status(404).json({ error: `product  not found` })
		}
		return res.status(200).json(product)
	}
}

export default handler
