import { createCartSlice } from "./slices/cartSlice"
import { createUserSlice } from "./slices/userSlice"
import { create } from "zustand"
import { CartState, UserState } from "@/types"
import { devtools } from "zustand/middleware"

export const useBoundStore = create<CartState & UserState>()(
	devtools((...a) => ({
		...createCartSlice(...a),
		...createUserSlice(...a),
	}))
)
