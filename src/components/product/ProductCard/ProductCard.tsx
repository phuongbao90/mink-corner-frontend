import { FC } from "react"
import { useRouter } from "next/router"
import { DiscountBadge, NewReleaseBadge, ProductCardImage } from "@/components"
import { useProductVariant } from "@/hooks"
import { Product } from "@/features/products"
import { formatCurrency } from "@/utils"
import {
	Badge,
	Card,
	Center,
	Flex,
	Group,
	rem,
	Text,
	Title,
} from "@mantine/core"
import { useProductPrice } from "@/features/products"
import dayjs from "dayjs"

type Props = {
	product: Product
}

const ProductCard: FC<Props> = ({ product }) => {
	const { loadedVariant } = useProductVariant(product)
	const {
		originalPrice,
		effectivePrice,
		discountPercent,
		discountAmount,
		isDiscounted,
		discountType,
	} = useProductPrice(loadedVariant)

	const isOutOfStock =
		typeof loadedVariant?.quantity === "number" && loadedVariant?.quantity <= 0
			? true
			: false
	const router = useRouter()

	const newReleased =
		Math.abs(dayjs(product.date_created).diff(new Date(), "days")) <= 20

	if (!product) return null

	return (
		<Card
			radius="lg"
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
				{isOutOfStock && (
					<Badge
						component="span"
						color="gray"
						variant="filled"
						sx={{ position: "absolute", top: "2%", right: "4%" }}
					>
						Hết hàng
					</Badge>
				)}
				{isDiscounted && (
					<DiscountBadge
						wrapperProps={{
							sx: {
								position: "absolute",
								top: "2%",
								right: "4%",
							},
						}}
						discountAmount={
							discountType === "amount"
								? formatCurrency(discountAmount)
								: `${discountPercent}%`
						}
					/>
				)}
				{newReleased && (
					<NewReleaseBadge
						wrapperProps={{
							sx: {
								position: "absolute",
								bottom: 6,
								left: 12,
							},
						}}
					/>
				)}
			</Card.Section>
			<Center mt="lg" mb={2}>
				<Title
					order={6}
					align="center"
					sx={(theme) => ({
						cursor: "pointer",
						fontSize: 12,
						[theme.fn.largerThan("xs")]: {
							fontSize: 14,
						},
					})}
					onClick={() => router.push(`/products/${product.slug}`)}
					fw={400}
					mih={42}
					lineClamp={2}
				>
					{product.name}
				</Title>
			</Center>
			<Center>
				{isDiscounted && (
					<Text
						fw={400}
						data-testid="original-price"
						td="line-through"
						c="gray.6"
						mr={{
							base: 4,
							xs: "xs",
						}}
						sx={(theme) => ({
							fontSize: 13,
							[theme.fn.largerThan("xs")]: {
								fontSize: 15,
							},
						})}
					>
						{formatCurrency(originalPrice)}
					</Text>
				)}

				<Text
					fw={600}
					data-testid="effective-price"
					sx={(theme) => ({
						fontSize: 13,
						[theme.fn.largerThan("xs")]: {
							fontSize: 16,
						},
					})}
				>
					{formatCurrency(effectivePrice)}
				</Text>
			</Center>
		</Card>
	)
}

export default ProductCard
