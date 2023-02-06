import { ProductItem } from "@/features/products"

export type CartState = {
	cart: Cart
	addCartItem: () => void
	removeCartItem: () => void
	updateCartItem: () => void
	clearCart: () => void
}

export type Cart = {
	id: string
	date_created: string | Date
	date_updated: string | Date
	device_id: string | null
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

export type AddCartItemProps = {
	cart_id: string
	product_item_id: number
	quantity: number
}

//---
