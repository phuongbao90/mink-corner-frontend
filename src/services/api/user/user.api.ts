import { User } from "@/features/user"
import {
	apiClient,
	CreateShoppingUserMutation,
	GetShoppingUserQuery,
} from "@/services"

export const getUser = async (user_id: string): Promise<User | null> => {
	let user = await fetchUser(user_id)
	if (!user) user = await createUser()
	return user
}

export const fetchUser = async (user_id: string | undefined) => {
	try {
		const { shopping_user } = await apiClient.request<{
			shopping_user: User
		}>(
			GetShoppingUserQuery,
			{ user_id },
			{ authorization: `Bearer ${process.env.JWT_SECRET}` }
		)

		return shopping_user
	} catch (error) {
		console.error("error fetchUser", error)
		return null
	}
}

export const createUser = async () => {
	try {
		const { shopping_user } = await apiClient.request<{
			shopping_user: User
		}>(
			CreateShoppingUserMutation,
			{},
			{ authorization: `Bearer ${process.env.JWT_SECRET}` }
		)

		return shopping_user
	} catch (error) {
		console.error("error createUser", error)
		return null
	}
}
