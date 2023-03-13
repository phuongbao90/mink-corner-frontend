import * as checkoutAPI from "@/services/api/checkout"
import type { NextApiRequest, NextApiResponse } from "next"
import { CreateOrderData, Order } from "@/features/checkout"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Order | Order[] | { error: string }>
) {
	const order_id =
		typeof req.query.order_id === "string" ? req.query.order_id : undefined

	if (req.method === "GET") {
		if (!order_id) {
			return res.status(404).json({ error: "order_id was not provided" })
		}
		const order = await checkoutAPI.fetchOrder(order_id)

		if (!order) {
			return res
				.status(404)
				.json({ error: `order with order_id=${order_id} was not found` })
		}

		return res.status(200).json(order)
	}

	if (req.method === "POST") {
		const order_data: CreateOrderData = req.body

		const created_order = await checkoutAPI.createOrder(order_data)

		if (!created_order) return res.status(404)

		return res.status(200).json(created_order)
	}
}

export default handler
