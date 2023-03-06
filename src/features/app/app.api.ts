import { JWT_SECRET } from "@/constant"
import { AppConfig, GET_APP_CONFIGS } from "@/features/app"
import { apiClient } from "@/services"
import { Banner, GET_BANNER } from "@/features/banners"

export const getAppConfigs = async () => {
	try {
		const { app_configs } = await apiClient.request<{
			app_configs: AppConfig
		}>(
			GET_APP_CONFIGS,
			{},
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		return app_configs
	} catch (error) {
		console.log("🚀 ~ file: getAppConfigs ~ error", error)
		return Promise.reject(new Error(`Cannot get app configs`))
	}
}

// export const getBanner = async (name: string) => {
// 	if (!name || typeof name !== "string") {
// 		return Promise.reject(
// 			new Error(`Invalid cart id supplied: ${JSON.stringify(name)}`)
// 		)
// 	}

// 	try {
// 		const { banner } = await apiClient.request<{
// 			banner: [Banner]
// 		}>(
// 			GET_BANNER,
// 			{ name },
// 			{
// 				authorization: `Bearer ${JWT_SECRET}`,
// 			}
// 		)

// 		if (banner && banner.length === 1) {
// 			return banner[0]
// 		}
// 	} catch (error) {
// 		console.log("🚀 ~ file: getBanner ~ error", error)
// 		return Promise.reject(new Error(`Cannot get banner`))
// 	}
// }
