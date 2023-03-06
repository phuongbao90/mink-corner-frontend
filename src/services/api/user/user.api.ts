import { JWT_SECRET } from "@/constant"
import { UpdateUserData, User } from "@/features/user"
import { apiClient } from "@/services"
import {
	GET_USER_QUERY,
	CreateShoppingUserMutation,
	UPDATE_USER,
} from "@/services/api/user"

export const getUser = async (user_id: string): Promise<User | null> => {
	let user = await fetchUser(user_id)
	if (!user) user = await createUser()
	return user
}

export const fetchUser = async (user_id: string | undefined) => {
	try {
		const { shopping_user } = await apiClient.request<{
			shopping_user: User
		}>(GET_USER_QUERY, { user_id }, { authorization: `Bearer ${JWT_SECRET}` })

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
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return shopping_user
	} catch (error) {
		console.error("error createUser", error)
		return null
	}
}

export const updateUser = async (user_data: UpdateUserData) => {
	console.log("user_data", user_data)
	try {
		const { update_shopping_user_item } = await apiClient.request<{
			update_shopping_user_item: User
		}>(
			UPDATE_USER,
			{ user_data, id: user_data.id },
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return update_shopping_user_item
	} catch (error) {
		console.error("error createUser", error)
		return null
	}
}
