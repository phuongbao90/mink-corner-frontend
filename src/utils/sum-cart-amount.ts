import { CartItem } from "@/features/cart"

export const sumCartAmount = (cartItems: CartItem[] | null | undefined) => {
	if (!cartItems) return 0

	return cartItems.reduce((acc, curr) => {
		acc = acc + curr.quantity * +curr.product_item_id.price

		return acc
	}, 0)
}
