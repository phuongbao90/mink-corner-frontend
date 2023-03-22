import { JWT_SECRET, pageRoutes } from "@/constant"
import {
	AppConfig,
	GET_APP_CONFIGS,
	GET_SEO_META_QUERY,
	SEOMetaType,
} from "@/features/app"
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

type keys = keyof typeof pageRoutes

export const getSeoMeta = async (page: typeof pageRoutes[keys]) => {
	try {
		const { seo_meta } = await apiClient.request<{
			seo_meta: SEOMetaType[]
		}>(
			GET_SEO_META_QUERY,
			{ page },
			{
				authorization: `Bearer ${JWT_SECRET}`,
			}
		)

		return seo_meta[0]
	} catch (error) {
		console.log("🚀 ~ file: getSeoMeta ~ error", error)
		return Promise.reject(new Error(`Cannot get seo meta`))
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
