import { JWT_SECRET } from "@/constant"
import { Banner, GET_BANNER } from "@/features/banners"
import { apiClient } from "@/services"

export const getBanner = async (name: string) => {
	if (!name || typeof name !== "string") {
		return Promise.reject(
			new Error(`Invalid cart id supplied: ${JSON.stringify(name)}`)
		)
	}

	try {
		const { banner } = await apiClient.request<{
			banner: [Banner]
		}>(
			GET_BANNER,
			{ name },
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		if (banner && banner.length === 1) {
			return banner[0]
		}
	} catch (error) {
		console.log("🚀 ~ file: getBanner ~ error", error)
		return Promise.reject(new Error(`Cannot get banner`))
	}
}

export const getBanners = async () => {
	try {
		const { banner } = await apiClient.request<{
			banner: [Banner]
		}>(
			GET_BANNER,
			{ name },
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		if (banner && banner.length === 1) {
			return banner[0]
		}
	} catch (error) {
		console.log("🚀 ~ file: getBanner ~ error", error)
		return Promise.reject(new Error(`Cannot get banner`))
	}
}
