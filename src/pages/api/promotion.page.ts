import * as promotionApi from "@/features/promotion"
import { PromotionType } from "@/features/promotion"

import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<PromotionType | { error: string }>
) {
	const { discountCode } = req.query

	if (req.method === "GET") {
		let _discount_code =
			typeof discountCode === "string" ? discountCode : undefined
		if (!_discount_code)
			return { error: `Banner-Name: ${_discount_code} is invalid` }

		const promotion = await promotionApi.getPromotion(_discount_code)
		if (!promotion) {
			return res
				.status(404)
				.json({ error: `promotion with ${discountCode}  not found` })
		}
		return res.status(200).json(promotion)
	}
}

export default handler
