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
	// if (req.method === "PATCH") {
	// 	const { quantity, cart_item_id } = req.body as UpdateCartItemPropType

	// 	if (!cart_item_id || !quantity) {
	// 		return res
	// 			.status(404)
	// 			.json({ error: "Invalid supplied cart_item_id or quantity" })
	// 	}

	// 	const updated_cart_item = await checkoutAPI.updateCartItem({
	// 		quantity,
	// 		cart_item_id,
	// 	})

	// 	return res.status(200).json(updated_cart_item)
	// }
	// if (req.method === "DELETE") {
	// 	const { cart_item_id } = req.query

	// 	if (!cart_item_id || typeof cart_item_id !== "string") {
	// 		return res.status(404).json({ error: "Invalid supplied cart_item_id" })
	// 	}

	// 	await checkoutAPI.removeCartItem(cart_item_id)

	// 	return res.status(200).json({ message: "Cart Item deleted successfully" })
	// }
}

export default handler
