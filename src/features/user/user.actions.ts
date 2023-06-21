import { axiosClient, fetcher } from "@/services"
import { storage } from "@/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiRoutes } from "@/constant"
import {
	CreateAddressType,
	UpdateAddressType,
	UpdateUserData,
	User,
	UserAddress,
} from "@/features/user"
import { getUserIdFromLocalstorage } from "@/utils/auth"

export const userKeys = {
	detail: (user_id: string | undefined) => [
		{ scope: "user", type: "detail", user_id },
	],
	address: [{ scope: "address", type: "list" }],
}

export const useGetUser = () => {
	const user_id = getUserIdFromLocalstorage()

	return useQuery({
		queryKey: userKeys.detail(user_id),
		queryFn: () =>
			fetcher<User>({
				url: apiRoutes.user,
				params: {
					user_id,
				},
			}),

		enabled: Boolean(user_id) && user_id !== "undefined",
	})
}

export const useCreateUser = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createUser,
		onSuccess(data, variables, context) {
			if (data) {
				queryClient.setQueryData(userKeys.detail(data.id), data)
			}
		},
	})
}

export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (user_data: UpdateUserData) =>
			axiosClient.patch(apiRoutes.user, user_data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "user" }] })
		},
	})
}

const createUser = async () => {
	try {
		const { data } = await axiosClient.post<User>(apiRoutes.user, {})
		return data
	} catch (error) {
		console.log(error)
		return null
	}
}

const getUser = async (user_id?: string) => {
	if (!user_id) return null
	try {
		const user = await fetcher<User>({
			url: apiRoutes.user,
			params: { user_id },
		})
		return user
	} catch (error) {
		console.log(error)
		return null
	}
}

export const logoutUser = () => {}

export const useGetUserAddress = () => {
	const user_id = storage.getItem("user_id")
	return useQuery({
		queryKey: userKeys.address,
		queryFn: () =>
			fetcher<UserAddress[]>({
				url: apiRoutes.address,
				params: {
					user_id,
				},
			}),

		enabled: Boolean(user_id) && user_id !== "undefined",
	})
}

export const useCreateUserAddress = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (addressData: CreateAddressType) =>
			axiosClient.post(apiRoutes.address, addressData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "address" }] })
		},
	})
}

export const useUpdateUserAddress = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (addressData: UpdateAddressType) =>
			axiosClient.patch(`${apiRoutes.address}`, addressData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "address" }] })
		},
	})
}

export const useRemoveUserAddress = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (addressId: string) =>
			axiosClient.delete(`${apiRoutes.address}?addressId=${addressId}`),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "address" }] })
		},
	})
}
