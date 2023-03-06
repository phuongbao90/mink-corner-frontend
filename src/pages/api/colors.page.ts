import { Color } from "@/features/products"
import * as productAPI from "@/services/api/products"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Color[] | { error: string }>
) {
	if (req.method === "GET") {
		const colors = await productAPI.getColors()

		if (!colors) {
			return res.status(404).json({ error: `colors  not found` })
		}

		return res.status(200).json(colors)
	}
}

export default handler
