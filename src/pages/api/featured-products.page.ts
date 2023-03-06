import { TFeaturedProducts } from "@/features/products"
import * as productAPI from "@/services/api/products"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<TFeaturedProducts | { error: string }>
) {
	if (req.method === "GET") {
		const featuredProducts = await productAPI.fetchFeaturedProducts()
		if (!featuredProducts) {
			return res.status(404).json({ error: `featuredProducts  not found` })
		}
		return res.status(200).json(featuredProducts)
	}
}

export default handler
