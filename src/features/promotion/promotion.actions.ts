import { PromotionType } from "./promotion.types"
import { apiRoutes } from "@/constant"

import { fetcher } from "@/services"
import { useQuery } from "@tanstack/react-query"

export const promotionKeys = {
	all: [{ scope: "promotion", type: "list" }],
	detail: (discountCode: string | undefined) => [
		{ scope: "promotion", type: "detail", discountCode },
	],
}

export const useGetPromotions = () => {
	return useQuery({
		queryKey: promotionKeys.all,
		queryFn: () =>
			fetcher<PromotionType[]>({
				url: apiRoutes.promotion,
				params: {},
			}),
	})
}

export const useGetPromotion = (discountCode?: string) => {
	return useQuery({
		queryKey: promotionKeys.detail(discountCode),
		queryFn: () =>
			fetcher<PromotionType>({
				url: apiRoutes.promotion,
				params: { discountCode },
			}),
		enabled: !!discountCode,
	})
}
