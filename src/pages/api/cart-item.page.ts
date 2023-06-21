import { Cart, CartItem } from "@/features/cart"
import * as cartAPI from "@/services/api/cart"
import type { NextApiRequest, NextApiResponse } from "next"
import { AddCartItemProps } from "@/features/cart"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		Cart | CartItem | { error: string } | { message: string }
	>
) {
	if (req.method === "POST") {
		const cartItemData: AddCartItemProps = req.body
		const cart_item = await cartAPI.addCartItem(cartItemData)
		console.log("🚀 ~ file: cart-item.page.ts:15 ~ cart_item:", cart_item)

		if (!cart_item) return res.status(404)

		return res.status(200).json(cart_item)
	}
}

export default handler
