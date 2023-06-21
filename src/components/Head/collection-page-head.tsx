import { BaseHead } from "@/components/Head/base-head"
import { SITE_URL, pageRoutes } from "@/constant"
import { useGetAppConfigs, useGetSeoMeta } from "@/features/app"
import { appendImageUrl } from "@/utils"
import { NextSeo } from "next-seo"

export const CollectionPageHead = () => {
	const { data } = useGetSeoMeta(pageRoutes.collection)
	const { data: configs } = useGetAppConfigs()

	const images = data?.og_images?.map((el) => ({
		url: appendImageUrl(el.directus_files_id?.id),
	}))

	return (
		<BaseHead appConfigs={configs}>
			<NextSeo
				title={data?.title || "Danh sách sản phẩm khuyến mãi của Mink's Corner"}
				description={data?.description}
				canonical="https://www.canonical.ie/"
				openGraph={{
					type: "website",
					title:
						data?.title || "Danh sách sản phẩm khuyến mãi của Mink's Corner",
					description: data?.description,
					siteName: configs?.store_name || "Mink's Corner",
					url: `${SITE_URL}${pageRoutes.collection}`,
					locale: "vi_VN",
					images: images,
				}}
			/>
		</BaseHead>
	)
}
