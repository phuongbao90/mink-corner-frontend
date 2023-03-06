import { Size } from "@/features/products"
import * as productAPI from "@/services/api/products"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Size[] | { error: string }>
) {
	if (req.method === "GET") {
		const sizes = await productAPI.getSizes()

		if (!sizes) {
			return res.status(404).json({ error: `sizes  not found` })
		}

		return res.status(200).json(sizes)
	}
}

export default handler
