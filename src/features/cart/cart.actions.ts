import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AddCartItemProps, Cart } from "@/features/cart"
import { apiRoutes } from "@/constant"
import { fetcher } from "@/services"
import { axiosClient } from "../../services/client"

export const cartKeys = {
	detail: (cart_id: string | undefined) => [
		{ scope: "cart", type: "detail", cart_id },
	],
}

export const useGetCart = (cart_id: string | undefined) => {
	return useQuery({
		queryKey: cartKeys.detail(cart_id),
		queryFn: () =>
			fetcher<Cart>({
				url: apiRoutes.cart,
				params: {
					cart_id,
				},
			}),
		enabled: Boolean(cart_id) && cart_id !== "undefined",
	})
}

export const useAddCartItemMutation = (cart_id: string | undefined) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: AddCartItemProps) =>
			axiosClient.post(apiRoutes.cart, data, {
				params: {
					cart_id,
				},
			}),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "cart" }] })
		},
		onMutate: () => {},
		onSettled: (data, error, variables, context) => {},
		onError: (error, variables, context) => {},
	})
}
