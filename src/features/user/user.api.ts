import { JWT_SECRET } from "@/constant"
import {
	UpdateAddressType,
	UpdateUserData,
	User,
	UserAddress,
} from "@/features/user"
import {
	CREATE_ADDRESS_QUERY,
	CREATE_USER,
	GET_ADDRESS,
	GET_USER_QUERY,
	REMOVE_ADDRESS_QUERY,
	UPDATE_ADDRESS_QUERY,
	UPDATE_USER,
} from "@/features/user/user.graphql"
import { apiClient } from "@/services"

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
		}>(CREATE_USER, {}, { authorization: `Bearer ${JWT_SECRET}` })

		return shopping_user
	} catch (error) {
		console.error("error createUser", error)
		return null
	}
}

export const updateUser = async (user_data: UpdateUserData) => {
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

export const fetchUserAddress = async (user_id?: string) => {
	if (!user_id) {
		return Promise.reject(
			new Error(`Invalid user_id supplied: ${JSON.stringify(user_id)}`)
		)
	}
	try {
		const { user_address } = await apiClient.request<{
			user_address: UserAddress[]
		}>(
			GET_ADDRESS,
			{
				user_id,
			},
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return user_address
	} catch (error) {
		console.error("checkout.api.ts - fetchUserAddress -> ", error)
		return Promise.reject(
			new Error(`checkout.api.ts -> failed to fetch user address`)
		)
	}
}
export const createUserAddress = async (addressData?: UserAddress) => {
	try {
		const { create_user_address_item } = await apiClient.request<{
			create_user_address_item: UserAddress
		}>(
			CREATE_ADDRESS_QUERY,
			{
				data: addressData,
			},
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return create_user_address_item
	} catch (error) {
		return Promise.reject(
			new Error(`createUserAddress -> failed to create user addres`)
		)
	}
}
export const updateUserAddress = async (addressData: UpdateAddressType) => {
	try {
		const { update_user_address_item } = await apiClient.request<{
			update_user_address_item: UserAddress
		}>(
			UPDATE_ADDRESS_QUERY,
			{
				id: addressData.id,
				data: addressData,
			},
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return update_user_address_item
	} catch (error) {
		return Promise.reject(
			new Error(`createUserAddress -> failed to create user addres`)
		)
	}
}
export const removeUserAddress = async (addressId: string) => {
	try {
		const { delete_user_address_item } = await apiClient.request<{
			delete_user_address_item: { id: string }
		}>(
			REMOVE_ADDRESS_QUERY,
			{
				id: addressId,
			},
			{ authorization: `Bearer ${JWT_SECRET}` }
		)

		return delete_user_address_item
	} catch (error) {
		return Promise.reject(
			new Error(`removeUserAddress -> failed to delete user address`)
		)
	}
}
