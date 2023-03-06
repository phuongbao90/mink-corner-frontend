import * as bannerApi from "@/features/banners"
import { Banner } from "@/features/banners"

import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Banner | { error: string }>
) {
	const { name } = req.query

	if (req.method === "GET") {
		let _name = typeof name === "string" ? name : undefined
		if (!_name) return { error: `Banner-Name: ${_name} is invalid` }

		const product = await bannerApi.getBanner(_name)
		if (!product) {
			return res.status(404).json({ error: `product  not found` })
		}
		return res.status(200).json(product)
	}
}

export default handler
