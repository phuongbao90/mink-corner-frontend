import { createCartSlice } from "./slices/cartSlice"
import { createUserSlice } from "./slices/userSlice"
import { create } from "zustand"

import { devtools } from "zustand/middleware"
import { CartState, UserState } from "@/features"

export const useBoundStore = create<CartState & UserState>()(
	devtools((...a) => ({
		...createCartSlice(...a),
		...createUserSlice(...a),
	}))
)
