import { User, UserState } from "@/features/user"
import { StateCreator } from "zustand"
import { devtools } from "zustand/middleware"

export const createUserSlice: StateCreator<UserState> = (set, get) => ({
	user: null,
	user_id: null,
	set_user: (user: User) => set(() => ({ user })),
})
