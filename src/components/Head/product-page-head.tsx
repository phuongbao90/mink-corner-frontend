import { BaseHead } from "@/components/Head/base-head"
import { SITE_URL, pageRoutes } from "@/constant"
import { useGetAppConfigs } from "@/features/app"
import { Product } from "@/features/products"
import { getInitialLoadedProductItem } from "@/features/products/utils/get-initial-loaded-product-item"
import { appendImageUrl } from "@/utils"
import { ProductJsonLd, NextSeo } from "next-seo"

export const ProductPageHead = ({
	product,
}: {
	product: Product | undefined
}) => {
	const { data: configs } = useGetAppConfigs()
	const productItem = getInitialLoadedProductItem(product)

	if (!product) return <BaseHead appConfigs={configs} />

	const offers = [
		{
			price: productItem?.price,
			priceCurrency: "VND",
			itemCondition: "https://schema.org/NewCondition",
			availability:
				Number(productItem?.quantity) > 0
					? "https://schema.org/InStock"
					: "https://schema.org/OutOfStock",
			url: `${SITE_URL}${pageRoutes.products}/${product?.slug}`,
			validFrom: "2023-03-13",
			seller: {
				name: configs?.store_name,
			},
		},
	]

	return (
		<BaseHead appConfigs={configs}>
			<NextSeo
				title={product.name}
				description={
					product.description ||
					`Mang đến cho bạn sự quý phái với bộ sưu tập ${product.category.category_name} của chúng tôi. Chọn ngay ${product.category.category_name} phù hợp với phong cách của bạn và tạo điểm nhấn cho bộ trang phục của mình.`
				}
				canonical="https://www.canonical.ie/"
				openGraph={{
					type: "website",
					title: product?.name,
					description: `Mang đến cho bạn sự quý phái với bộ sưu tập ${product.category.category_name} của chúng tôi. Chọn ngay ${product.category.category_name} phù hợp với phong cách của bạn và tạo điểm nhấn cho bộ trang phục của mình.`,
					siteName: configs?.store_name || "Mink's Corner",
					url: `${SITE_URL}${pageRoutes.products}/${product.slug}`,
					locale: "vi_VN",
					images: [
						{
							url: appendImageUrl(product.cover_image?.id),
						},
					],
				}}
			/>
			<ProductJsonLd
				productName={product.name}
				images={[appendImageUrl(product.cover_image?.id)]}
				description={
					product.description ||
					`Mang đến cho bạn sự quý phái với bộ sưu tập ${product.category.category_name} của chúng tôi. Chọn ngay ${product.category.category_name} phù hợp với phong cách của bạn và tạo điểm nhấn cho bộ trang phục của mình.`
				}
				brand={configs?.store_name}
				sku={productItem?.SKU || product.SKU}
				offers={offers}
			/>
		</BaseHead>
	)
}
