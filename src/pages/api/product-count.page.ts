import { FetchOptionsType } from "@/features/collections"
import * as productAPI from "@/services/api/products"
import type { NextApiRequest, NextApiResponse } from "next"
import qs from "qs"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<number | { error: string }>
) {
	// @ts-ignore
	const options: FetchOptionsType = qs.parse(req.query)

	if (req.method === "GET") {
		const count = await productAPI.countProducts(options)
		if (!count) {
			return res.status(404).json({ error: `Cannot count products` })
		}
		return res.status(200).json(count)
	}
}

export default handler
