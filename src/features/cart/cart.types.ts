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
	date_updated: string | Date | undefined
	device_id: string | undefined
	items: CartItem[]
	items_func: {
		count: number
	}
	subtotal: number
}

export type CartItem = {
	id: string
	quantity: number
	product_item_id: ProductItem
	date_created: string | Date
	date_updated: string | Date | null
}

export type AddCartItemProps = {
	cart_id: string
	product_item_id: number
	quantity: number
}

//---
