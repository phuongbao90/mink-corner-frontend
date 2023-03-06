import { FC, useState } from "react"
import { useRouter } from "next/router"
import { ProductCardImage } from "@/components"
import { usePrice, useProductVariant } from "@/hooks"
import { Product } from "@/features/products"
import { formatCurrency } from "@/utils"
import { Badge, Card, Center, Flex, Group, Text, Title } from "@mantine/core"

type Props = {
	product: Product
}

const ProductCard: FC<Props> = ({ product }) => {
	const { loadedVariant } = useProductVariant(product)
	const {
		originalPrice,
		effectivePrice,
		discountPercentage,
		discountAmount,
		isDiscounted,
	} = usePrice(product, loadedVariant)

	const isOutOfStock =
		typeof loadedVariant?.quantity === "number" && loadedVariant?.quantity <= 0
			? true
			: false
	const router = useRouter()

	if (!product) return null

	return (
		<Card
			radius="xl"
			withBorder
			data-testid="product-card"
			sx={{ borderColor: "#f5f5f5", position: "relative" }}
		>
			<Card.Section
				component="div"
				onClick={() => router.push(`/products/${product.slug}`)}
				sx={{
					position: "relative",
					aspectRatio: "0.9",
					cursor: "pointer",
					overflow: "hidden",
					margin: "-2% !important",
					borderRadius: 26,
				}}
			>
				<ProductCardImage
					alt="product-image"
					src={product?.cover_image?.id}
					style={{ objectFit: "cover" }}
				/>
				{isOutOfStock && (
					<Badge
						component="span"
						color="gray"
						variant="filled"
						sx={{ position: "absolute", top: "5%", right: "5%" }}
					>
						Hết hàng
					</Badge>
				)}
			</Card.Section>
			<Center mt="lg" mb={2}>
				<Title
					order={6}
					align="center"
					sx={{ cursor: "pointer" }}
					onClick={() => router.push(`/products/${product.slug}`)}
					fw={400}
					mih={42}
					lineClamp={2}
				>
					{/* {product.name} | {product.SKU}{" "} */}
					{product.name}
				</Title>
			</Center>
			<Center>
				<Text fw={600} data-testid="effective-price">
					{formatCurrency(effectivePrice)}
				</Text>
			</Center>
		</Card>
	)
}

export default ProductCard
