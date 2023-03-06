import { useBoundStore } from "@/store/useStore"
import { pageRoutes } from "./../../constant/index"
import { BannerLink } from "@/features/banners"
import { isEmpty } from "lodash"

export const useBannerLink = (link?: BannerLink): null | undefined | string => {
	const setCategoryFilter = useBoundStore((s) => s.actions.setCategoryFilter)
	if (!link || isEmpty(link)) return null
	let url: string = ""

	if (link.collection === "category") {
		setCategoryFilter(link.item.category_slug)
		// url = `${pageRoutes.collection}/${link.item.category_slug}`
		url = `${pageRoutes.collection}`
	}
	if (link.collection === "product") {
		url = `${pageRoutes.products}/${link.item.slug}`
	}

	return url
}
