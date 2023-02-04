import { Cart, CartState } from "@/types"
import { StateCreator } from "zustand"

export const createCartSlice: StateCreator<CartState> = (set, get) => ({
	cart: { id: null, user_id: null, items: null },
	addCartItem: () => {
		// set((state) => ({ todos: [...state.todos, todo] }))
	},
	removeCartItem: () => {
		// set((state) => ({ todos: [...state.todos, todo] }))
	},
	updateCartItem: () => {
		// set((state) => ({ todos: [...state.todos, todo] }))
	},
	clearCart: () => {
		// set((state) => ({ todos: [...state.todos, todo] }))
	},
})
