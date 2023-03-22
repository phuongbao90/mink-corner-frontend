import { BaseHead } from "@/components/Head/base-head"
import { SITE_URL, pageRoutes } from "@/constant"
import { useGetAppConfigs, useGetSeoMeta } from "@/features/app"
import { appendImageUrl } from "@/utils"
import { NextSeo } from "next-seo"

export const PromotionPageHead = () => {
	const { data } = useGetSeoMeta(pageRoutes.promotion)
	const { data: configs } = useGetAppConfigs()

	const images = data?.og_images?.map((el) => ({
		url: appendImageUrl(el.directus_files_id.id),
	}))

	return (
		<BaseHead appConfigs={configs}>
			<NextSeo
				title={
					data?.title || "Bộ sưu tập trang sức và phụ kiện từ Mink's Corner"
				}
				description={data?.description}
				canonical="https://www.canonical.ie/"
				openGraph={{
					type: "website",
					title:
						data?.title || "Bộ sưu tập trang sức và phụ kiện từ Mink's Corner",
					description: data?.description,
					siteName: configs?.store_name || "Mink's Corner",
					url: `${SITE_URL}${pageRoutes.promotion}`,
					locale: "vi_VN",
					images: images,
				}}
			/>
		</BaseHead>
	)
}
