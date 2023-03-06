import { ShippingMethod } from "@/features/checkout"
import * as checkoutAPI from "@/services/api/checkout"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ShippingMethod[] | { error: string }>
) {
	if (req.method === "GET") {
		const shippingMethods = await checkoutAPI.fetchShippingMethods()

		if (!shippingMethods) {
			return res.status(404).json({ error: `shippingMethods  not found` })
		}

		return res.status(200).json(shippingMethods)
	}
}

export default handler
