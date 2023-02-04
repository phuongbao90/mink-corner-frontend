import { ProductItem } from "@/features/products"

export type CartState = {
	cart: Cart
	addCartItem: () => void
	removeCartItem: () => void
	updateCartItem: () => void
	clearCart: () => void
}

export type Cart = {
	id: string | undefined
	user_id: string | undefined
	items: CartItem[] | undefined
	items_func: {
		count: number
	}
}

export type CartItem = {
	id: string
	quantity: number
	product_item_id: ProductItem
}

export type AddCartItemProps = {
	cart_id: string
	product_item_id: number
	quantity: number
}
