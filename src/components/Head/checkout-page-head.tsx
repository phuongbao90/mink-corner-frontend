import { BaseHead } from "@/components/Head/base-head"
import { SITE_URL, pageRoutes } from "@/constant"
import { useGetAppConfigs, useGetSeoMeta } from "@/features/app"
import { appendImageUrl } from "@/utils"
import { NextSeo } from "next-seo"

export const CheckoutPageHead = () => {
	const { data } = useGetSeoMeta(pageRoutes.checkout)
	const { data: configs } = useGetAppConfigs()

	const images = data?.og_images?.map((el) => ({
		url: appendImageUrl(el?.directus_files_id?.id),
	}))

	return (
		<BaseHead appConfigs={configs}>
			<NextSeo
				title={data?.title || "Thanh Toán | Mink's Corner"}
				canonical="https://www.canonical.ie/"
				openGraph={{
					type: "website",
					title: data?.title || "Thanh Toán | Mink's Corner",
					siteName: configs?.store_name || "Mink's Corner",
					url: `${SITE_URL}${pageRoutes.checkout}`,
					locale: "vi_VN",
					images: images,
				}}
			/>
		</BaseHead>
	)
}
