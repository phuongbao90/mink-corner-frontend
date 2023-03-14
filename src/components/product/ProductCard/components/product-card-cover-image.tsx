import { useProductContext } from "@/components/product/ProductCard/product-card"
import { ProductCardImage } from "@/components/UI"
import { pageRoutes } from "@/constant"
import { Card, rem } from "@mantine/core"
import { useRouter } from "next/router"
import { ReactNode } from "react"

export const ProductCardCoverImage = ({
	children,
}: {
	children: ReactNode | ReactNode[]
}) => {
	const { product } = useProductContext()

	const router = useRouter()

	return (
		<Card.Section
			component="div"
			onClick={() => router.push(`${pageRoutes.products}/${product.slug}`)}
			sx={{
				position: "relative",
				aspectRatio: "0.9",
				cursor: "pointer",
				overflow: "hidden",
				margin: `-${rem(8)} !important`,
				borderRadius: 10,
			}}
		>
			{!!product?.cover_image && (
				<ProductCardImage
					alt="product-image"
					src={product?.cover_image?.id}
					style={{ objectFit: "cover" }}
				/>
			)}
			{children}
		</Card.Section>
	)
}
