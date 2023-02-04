import { Cart, CartItem } from "@/features"
import * as cartAPI from "@/services/api/cart"
import type { NextApiRequest, NextApiResponse } from "next"
import { AddCartItemProps } from "@/features/cart"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Cart | CartItem>
) {
	const cart_id =
		typeof req.query.cart_id === "string" ? req.query.cart_id : undefined

	if (req.method === "GET") {
		const shoppingCart = await cartAPI.fetchCart(cart_id)
		// const cartItems = await cartAPI.fetchCartItems(cart_id)
		if (!shoppingCart) {
			return res.status(404)
		}

		// const responseData = {
		// 	id: shoppingCart.id,
		// 	user_id: shoppingCart.user_id,
		// 	items: cartItems,
		// 	items_func: {
		// 		count: cartItems?.length,
		// 	},
		// }

		return res.status(200).json(shoppingCart)
	}

	if (req.method === "POST") {
		const cartItemData: AddCartItemProps = req.body

		const cart_item = await cartAPI.addCartItem(cartItemData)
		console.log("cart_item", cart_item)

		if (!cart_item) {
			return res.status(404)
		}
		return res.status(200).json(cart_item)
	}
	if (req.method === "PUT") {
	}
	if (req.method === "DELETE") {
	}
}

export default handler
