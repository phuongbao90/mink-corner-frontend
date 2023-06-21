import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AddCartItemProps, Cart } from "@/features/cart"
import { apiRoutes } from "@/constant"
import { fetcher } from "@/services"
import { axiosClient } from "../../services/client"
import { getUserIdFromLocalstorage } from "@/utils/auth"

export const cartKeys = {
	detail: (user_id: string | undefined | null) => [
		{ scope: "cart", type: "detail", user_id },
	],
}

export const useGetCart = () => {
	const user_id = getUserIdFromLocalstorage()

	return useQuery({
		queryKey: cartKeys.detail(user_id),
		queryFn: () =>
			fetcher<Cart>({
				url: apiRoutes.cart,
				params: {
					user_id,
				},
			}),
		enabled: !!user_id,
	})
}
export const useCreateCart = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (user_id: string) =>
			axiosClient.post<Cart>(apiRoutes.cart, { user_id }),

		onSuccess: (data, variables, context) => {
			queryClient.setQueryData(cartKeys.detail(variables), () => data.data)
		},
	})
}

export const useAddCartItemMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: AddCartItemProps) =>
			axiosClient.post(apiRoutes.cartItem, data, {}),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "cart" }] })
		},
	})
}

export const useUpdateCartItem = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: { cart_item_id: string; quantity: number }) =>
			axiosClient.patch(`${apiRoutes.cart}`, data),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "cart" }] })
		},
	})
}

export const useRemoveCartItem = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (cart_item_id: string) =>
			axiosClient.delete(`${apiRoutes.cart}?cart_item_id=${cart_item_id}`),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "cart" }] })
		},
	})
}

export const useClearCart = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (cart_id: string) =>
			axiosClient.delete(`${apiRoutes.cart}?cart_id=${cart_id}`),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "cart" }] })
		},
	})
}
