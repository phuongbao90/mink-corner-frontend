import { JWT_SECRET } from "@/constant"
import {
	GET_PROMOTION,
	GET_PROMOTIONS,
	PromotionType,
} from "@/features/promotion"
import { apiClient } from "@/services"

export const getPromotions = async () => {
	try {
		const { promotion } = await apiClient.request<{
			promotion: PromotionType[]
		}>(
			GET_PROMOTIONS,
			{},
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		return promotion
	} catch (error) {
		console.log("🚀 ~ file: getPromotion ~ error", error)
		return Promise.reject(new Error(`Cannot get promotion`))
	}
}
export const getPromotion = async (discount_code: string) => {
	if (!discount_code || typeof discount_code !== "string") {
		return Promise.reject(
			new Error(
				`Invalid promotion code supplied: ${JSON.stringify(discount_code)}`
			)
		)
	}

	try {
		const { promotion } = await apiClient.request<{
			promotion: [PromotionType]
		}>(
			GET_PROMOTION,
			{ discount_code },
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		if (promotion && promotion.length === 1) {
			return promotion[0]
		}
	} catch (error) {
		console.log("🚀 ~ file: getPromotion ~ error", error)
		return Promise.reject(new Error(`Cannot get promotion`))
	}
}
