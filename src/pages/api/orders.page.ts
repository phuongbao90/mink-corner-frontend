import * as checkoutAPI from "@/services/api/checkout"
import type { NextApiRequest, NextApiResponse } from "next"
import { Order } from "@/features/checkout"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Order[] | { error: string }>
) {
	const user_id =
		typeof req.query.user_id === "string" ? req.query.user_id : undefined

	if (req.method === "GET") {
		if (!user_id) {
			return res.status(404).json({ error: "user_id was not provided" })
		}
		const orders = await checkoutAPI.fetchOrders(user_id)

		if (!orders) {
			return res
				.status(404)
				.json({ error: `orders with user_id=${user_id} was not found` })
		}

		return res.status(200).json(orders)
	}
}

export default handler
