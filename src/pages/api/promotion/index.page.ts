import * as promotionApi from "@/features/promotion"
import { PromotionType } from "@/features/promotion"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<PromotionType[] | { error: string }>
) {
	if (req.method === "GET") {
		const promotions = await promotionApi.getPromotions()
		if (!promotions) {
			return res.status(404).json({ error: `promotions  not found` })
		}
		return res.status(200).json(promotions)
	}
}

export default handler
