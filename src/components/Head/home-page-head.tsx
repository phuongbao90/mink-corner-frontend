import { BaseHead } from "@/components/Head/base-head"
import { BACKEND_URL, SITE_URL, pageRoutes } from "@/constant"
import { useGetAppConfigs, useGetSeoMeta } from "@/features/app"
import { NextSeo } from "next-seo"

export const HomePageHead = () => {
	const { data } = useGetSeoMeta(pageRoutes.home)
	const { data: configs } = useGetAppConfigs()

	const images = data?.og_images?.map((image) => {
		const {
			directus_files_id: { id, title },
		} = image || {}

		return {
			url: `${BACKEND_URL}/assets/${id}?width=1200&height=630&fit=cover&quality=80`,
			alt: title,
			width: 1200,
			height: 630,
		}
	})

	return (
		<>
			<BaseHead appConfigs={configs}>
				<NextSeo
					{...(data || {})}
					openGraph={{
						type: "website",
						title: data?.title,
						description: data?.description,
						siteName: configs?.store_name || "Mink's Corner",
						images: images,
						url: SITE_URL,
						locale: "vi_VN",
					}}
				/>
			</BaseHead>
		</>
	)
}
