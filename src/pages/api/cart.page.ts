import { Cart, CartItem } from "@/features/cart"
import * as cartAPI from "@/services/api/cart"
import type { NextApiRequest, NextApiResponse } from "next"
import { AddCartItemProps } from "@/features/cart"
import { UpdateCartItemPropType } from "@/services/api/cart"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		Cart | CartItem | { error: string } | { message: string }
	>
) {
	// const cart_id =
	// 	typeof req.query.cart_id === "string" ? req.query.cart_id : undefined
	const user_id =
		typeof req.query.user_id === "string" ? req.query.user_id : undefined

	if (req.method === "GET") {
		if (!user_id) {
			return res.status(404).json({ error: "user_id was not provided" })
		}
		const cart = await cartAPI.fetchCartByUserId(user_id)

		if (!cart) {
			return res
				.status(404)
				.json({ error: `cart with user_id=${user_id} not found` })
		}

		const subtotal =
			cart.items?.reduce((acc, curr) => {
				acc += curr.quantity * +curr.product_item_id.price
				return acc
			}, 0) || 0

		cart.subtotal = subtotal

		return res.status(200).json(cart)
	}

	if (req.method === "POST") {
		const cartItemData: AddCartItemProps = req.body
		const cart_item = await cartAPI.addCartItem(cartItemData)
		if (!cart_item) return res.status(404)

		return res.status(200).json(cart_item)
	}
	if (req.method === "PATCH") {
		const { quantity, cart_item_id } = req.body as UpdateCartItemPropType

		if (!cart_item_id || !quantity) {
			return res
				.status(404)
				.json({ error: "Invalid supplied cart_item_id or quantity" })
		}

		const updated_cart_item = await cartAPI.updateCartItem({
			quantity,
			cart_item_id,
		})

		return res.status(200).json(updated_cart_item)
	}
	if (req.method === "DELETE") {
		const { cart_item_id, cart_id } = req.query

		if (cart_item_id && typeof cart_item_id === "string") {
			await cartAPI.removeCartItem(cart_item_id)
			return res.status(200).json({ message: "Cart Item deleted successfully" })
		}
		if (cart_id && typeof cart_id === "string") {
			await cartAPI.clearCart(cart_id)
			return res.status(200).json({ message: "Clear cart successfully" })
		}

		return res.status(404).json({ error: "Invalid query supplied" })
	}
}

export default handler
