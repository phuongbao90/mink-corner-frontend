import { ProductItem } from "./products"

export type CartState = {
	cart: Cart
	addCartItem: () => void
	removeCartItem: () => void
	updateCartItem: () => void
	clearCart: () => void
}

export type Cart = {
	id: string | null
	user_id: string | null
	items: CartItem[] | null
	items_func: {
		count: number
	}
}

export type CartItem = {
	id: string
	quantity: number
	product_item_id: ProductItem
}
