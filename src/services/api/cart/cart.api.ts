import { Cart, CartItem, AddCartItemProps } from "@/features"
import { apiClient } from "@/services"
import { AddCartItemMutation, GetCartQuery } from "./cart.graphql"

export const fetchCart = async (cart_id: string | undefined) => {
	if (!cart_id && typeof cart_id !== "string") {
		return Promise.reject(
			new Error(`Invalid cart id supplied: ${JSON.stringify(cart_id)}`)
		)
	}

	try {
		const { shopping_cart_by_id } = await apiClient.request<{
			shopping_cart_by_id: Cart
		}>(
			GetCartQuery,
			{ cart_id },
			{ authorization: `Bearer ${process.env.JWT_SECRET}` }
		)

		return shopping_cart_by_id
	} catch (error) {
		return Promise.reject(new Error(`cart.api.ts -> cart not found`))
	}
}

// export const fetchCartItems = async (cart_id: string | undefined) => {
// 	if (!cart_id && typeof cart_id !== "string") {
// 		return Promise.reject(
// 			new Error(`Invalid cart id supplied: ${JSON.stringify(cart_id)}`)
// 		)
// 	}
// 	try {
// 		const { shopping_cart_item } = await apiClient.request<{
// 			shopping_cart_item: CartItem[]
// 		}>(
// 			GetCartItemsQuery,
// 			{ cart_id },
// 			{ authorization: `Bearer ${process.env.JWT_SECRET}` }
// 		)

// 		return shopping_cart_item
// 	} catch (error) {
// 		console.error("🚀 ~ file: cart.api.ts:37 ~ fetchCartItems ~ error", error)
// 		return Promise.reject(new Error(`cart.api.ts -> cart items not found`))
// 	}
// }

export const addCartItem = async (data: AddCartItemProps) => {
	try {
		const { cart_item } = await apiClient.request<{
			cart_item: CartItem
		}>(AddCartItemMutation, data, {
			authorization: `Bearer ${process.env.JWT_SECRET}`,
		})

		return cart_item
	} catch (error) {
		return null
	}
}
