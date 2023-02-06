import { User, UserState } from "@/features"
import { StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

export const createUserSlice: StateCreator<UserState> = (set, get) => ({
	user: null,
	set_user: (user: User) => set(() => ({ user })),
})
