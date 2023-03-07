import { pageRoutes } from "./../../constant/index"
import { BannerLink } from "@/features/banners"
import { isEmpty } from "lodash"

export const useBannerLink = (link?: BannerLink): null | undefined | string => {
	if (!link || isEmpty(link)) return null
	let url: string = ""

	if (link.collection === "category") {
		url = `${pageRoutes.collection}`
	}
	if (link.collection === "product") {
		url = `${pageRoutes.products}/${link.item.slug}`
	}

	return url
}
