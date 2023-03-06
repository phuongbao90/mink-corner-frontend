import { sumCartAmount } from "./../../utils/sum-cart-amount"
import { useGetAppConfigs } from "@/features/app"
import { apiRoutes } from "@/constant"
import {
	City,
	CreateOrderData,
	District,
	Order,
	PaymentType,
	ShippingMethod,
	Ward,
} from "@/features/checkout"
import { axiosClient, fetcher } from "@/services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useGetCart } from "@/features/cart"

export const checkoutKeys = {
	cities: () => [{ scope: "cities", type: "list" }],
	districts: (province_id: string | undefined | null) => [
		{ scope: "districts", type: "list", province_id },
	],
	wards: (distrcit_id: string | undefined | null) => [
		{ scope: "wards", type: "list", distrcit_id },
	],

	paymentTypes: () => [{ scope: "payment-types", type: "list" }],
	shippingMethods: () => [{ scope: "shipping-methods", type: "list" }],
	orders: (user_id: string | undefined) => [
		{ scope: "order", type: "list", user_id },
	],
	order: (order_id: string | undefined) => [
		{ scope: "order", type: "detail", order_id },
	],
}

export const useGetCities = () => {
	return useQuery({
		queryKey: checkoutKeys.cities(),
		queryFn: () =>
			fetcher<City[]>({
				url: apiRoutes.cities,
			}),
		staleTime: 1000 * 60 * 60 * 24,
		refetchOnWindowFocus: false,
	})
}
export const useGetDistricts = (province_id: string | null | undefined) => {
	return useQuery({
		queryKey: checkoutKeys.districts(province_id),
		queryFn: () =>
			fetcher<District[]>({
				url: apiRoutes.districts + `?province_id=${province_id}`,
			}),
		enabled: !!province_id,
		staleTime: 1000 * 60 * 60 * 24,
		refetchOnWindowFocus: false,
	})
}
export const useGetWards = (district_id: string | null | undefined) => {
	return useQuery({
		queryKey: checkoutKeys.wards(district_id),
		queryFn: () =>
			fetcher<Ward[]>({
				url: apiRoutes.wards + `?district_id=${district_id}`,
			}),
		enabled: !!district_id,
		staleTime: 1000 * 60 * 60 * 24,
		refetchOnWindowFocus: false,
	})
}

export const useGetPaymentTypes = () => {
	return useQuery({
		queryKey: checkoutKeys.paymentTypes(),
		queryFn: () =>
			fetcher<PaymentType[]>({
				url: apiRoutes.paymentType,
			}),
	})
}
export const useGetShippingMethods = () => {
	return useQuery({
		queryKey: checkoutKeys.shippingMethods(),
		queryFn: () =>
			fetcher<ShippingMethod[]>({
				url: apiRoutes.shippingMethods,
			}),
	})
}

export const useGetOrder = (order_id: string) => {
	return useQuery({
		queryKey: checkoutKeys.order(order_id),
		queryFn: () =>
			fetcher<Order>({
				url: apiRoutes.order + `order_id=${order_id}`,
			}),
		enabled: !!order_id,
	})
}
export const useGetOrders = (user_id: string) => {
	return useQuery({
		queryKey: checkoutKeys.orders(user_id),
		queryFn: () =>
			fetcher<Order[]>({
				url: apiRoutes.orders + `user_id=${user_id}`,
			}),
		enabled: !!user_id,
	})
}
export const useCreateOrder = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (order_data: CreateOrderData) =>
			axiosClient.post(`${apiRoutes.order}`, order_data),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: [{ scope: "order" }] })
		},
	})
}

export const useGetShippingFeeDiscount = () => {
	const { data: appConfigs, isSuccess: isAppconfigsSuccess } =
		useGetAppConfigs()
	const { data: cart, isSuccess: isCartSuccess } = useGetCart()

	if (!isAppconfigsSuccess || !isCartSuccess) {
		return {
			discount_shipping_fee: 0,
		}
	}

	const { freeship_limit, freeship_target, is_freeship_program_on } = appConfigs

	if (!is_freeship_program_on) {
		return {
			discount_shipping_fee: 0,
		}
	}

	const sumCartTotalAmount = sumCartAmount(cart.items)
	if (sumCartTotalAmount < +freeship_target) {
		return {
			discount_shipping_fee: 0,
		}
	}

	return {
		discount_shipping_fee: +freeship_limit,
	}
}

export const useGetShippingFee = (shipping_method_id: string) => {
	const { data: shippingMethods, isSuccess } = useGetShippingMethods()
	const { discount_shipping_fee } = useGetShippingFeeDiscount()

	if (!isSuccess) {
		return {
			shipping_fee: undefined,
			isSuccess: false,
		}
	}

	const selectedShippingMethod = shippingMethods.find(
		(el) => el.id === shipping_method_id
	)
	if (!selectedShippingMethod) {
		return {
			shipping_fee: undefined,
			isSuccess: false,
		}
	}

	return {
		shipping_fee: Math.max(
			Number(selectedShippingMethod.price) - discount_shipping_fee,
			0
		),
		isSuccess: true,
	}
}

// export const useLocations = ({
// 	city_id,
// 	district_id,
// 	ward_id,
// }: {
// 	city_id: string | null
// 	district_id: string | null
// 	ward_id: string | null
// }) => {
// 	const { data: cities, isLoading: isLoadingCities } = useGetCities()
// 	const { data: districts, isLoading: isLoadingDistricts } =
// 		useGetDistricts(city_id)
// 	const { data: wards, isLoading: isLoadingWards } = useGetWards(district_id)

// 	const selected_city = (cities || []).find((city) => city?.id === city_id)
// 	const selected_district = (districts || []).find(
// 		(district) => district?.id === district_id
// 	)
// 	const selected_ward = (wards || []).find((ward) => ward?.id === ward_id)

// 	return {
// 		cities,
// 		isLoadingCities,
// 		districts,
// 		isLoadingDistricts,
// 		wards,
// 		isLoadingWards,
// 		selected_city,
// 		selected_district,
// 		selected_ward,
// 	}
// }
