import { JWT_SECRET } from "@/constant"
import { Cart, CartItem, AddCartItemProps } from "@/features/cart"
import { apiClient } from "@/services"
import {
	CLEAR_CART,
	GET_CART_BY_USER_ID,
	REMOVE_CART_ITEM_MUTATION,
} from "./cart.graphql"
import {
	AddCartItemMutation,
	GET_CART_BY_CART_ID,
	UPDATE_CART_ITEM_MUTATION,
} from "./cart.graphql"

export type AddCartItemPropType = {}
export type FetchCartItemPropType = {}
export type UpdateCartItemPropType = {
	cart_item_id: string
	quantity: number
}
export type RemoveCartItemPropType = {}

export const fetchCartByCartId = async (cart_id: string | undefined) => {
	if (!cart_id && typeof cart_id !== "string") {
		return Promise.reject(
			new Error(`Invalid cart id supplied: ${JSON.stringify(cart_id)}`)
		)
	}

	try {
		const { shopping_cart_by_id } = await apiClient.request<{
			shopping_cart_by_id: Cart
		}>(
			GET_CART_BY_CART_ID,
			{ cart_id },
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return shopping_cart_by_id
	} catch (error) {
		console.error("cart.api.ts - fetchCart -> ", error)
		return Promise.reject(new Error(`cart.api.ts -> cart not found`))
	}
}
export const fetchCartByUserId = async (user_id: string | undefined) => {
	if (!user_id && typeof user_id !== "string") {
		return Promise.reject(
			new Error(`Invalid user_id supplied: ${JSON.stringify(user_id)}`)
		)
	}

	try {
		const { shopping_cart } = await apiClient.request<{
			shopping_cart: [Cart]
		}>(
			GET_CART_BY_USER_ID,
			{ user_id },
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		if (shopping_cart && shopping_cart.length === 1) return shopping_cart[0]
		return undefined
	} catch (error) {
		console.error("cart.api.ts - fetchCartByUserId -> ", error)
		return Promise.reject(new Error(`cart.api.ts -> cart not found`))
	}
}

export const addCartItem = async (data: AddCartItemProps) => {
	try {
		const { cart_item } = await apiClient.request<{
			cart_item: CartItem
		}>(AddCartItemMutation, data, {
			authorization: `Bearer ${JWT_SECRET}`,
		})

		return cart_item
	} catch (error) {
		console.log("🚀 ~ file: cart.api.ts:38 ~ addCartItem ~ error", error)
		return Promise.reject(new Error(`Cannot add new cart item`))
	}
}

export const updateCartItem = async (data: UpdateCartItemPropType) => {
	try {
		const { cart_item } = await apiClient.request<{
			cart_item: CartItem
		}>(UPDATE_CART_ITEM_MUTATION, data, {
			authorization: `Bearer ${JWT_SECRET}`,
		})

		return cart_item
	} catch (error) {
		console.log("🚀 ~ file: cart.api.ts:38 ~ addCartItem ~ error", error)
		return Promise.reject(new Error(`Cannot update cart item`))
	}
}
export const removeCartItem = async (cart_item_id: string) => {
	try {
		const { cart_item } = await apiClient.request<{
			cart_item: CartItem
		}>(
			REMOVE_CART_ITEM_MUTATION,
			{ cart_item_id },
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		return cart_item
	} catch (error) {
		console.log("🚀 ~ file: cart.api.ts:38 ~ addCartItem ~ error", error)
		return Promise.reject(new Error(`Cannot remove new cart item`))
	}
}
export const fetchCartItem = async () => {}

export const clearCart = async (cart_id: string) => {
	try {
		const { update_shopping_cart_item } = await apiClient.request<{
			update_shopping_cart_item: Cart
		}>(
			CLEAR_CART,
			{ cart_id },
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		return update_shopping_cart_item
	} catch (error) {
		console.log("🚀 ~ file: cart.api.ts:38 ~ clearCart ~ error", error)
		return Promise.reject(new Error(`Cannot clear cart`))
	}
}
