import { DirectusImage } from "@/components"
import { CartItem } from "@/features/cart"
import { useProductPrice } from "@/features/products"
import { formatCurrency } from "@/utils"
import { Box, Flex, Group, Indicator, Text } from "@mantine/core"
import { isEmpty } from "lodash"

export const CheckoutSummaryItem = ({ item }: { item?: CartItem }) => {
	const { effectivePrice } = useProductPrice(item?.product_item_id)

	if (!item || isEmpty(item)) return null

	const { quantity, product_item_id } = item
	const { cover_image, product, color, size } = product_item_id

	return (
		<Flex align="center">
			<Box sx={{ position: "relative" }}>
				<Indicator
					label={<Text size={10}>{quantity}</Text>}
					color="red.6"
					size={16}
					zIndex={2}
				>
					<Box w={80} h={80}>
						<DirectusImage
							alt="product-image"
							src={String(cover_image?.id || product?.cover_image?.id)}
							sizes="10vw"
							style={{
								objectFit: "cover",
								borderRadius: 8,
							}}
						/>
					</Box>
				</Indicator>
			</Box>
			<Flex justify="space-between" ml="sm" sx={{ width: "100%" }}>
				<div>
					<Text size="sm" lineClamp={2}>
						{product.name}
					</Text>

					<Group mt={2}>
						{!!color && (
							<Text fz="xs" c="gray.6">
								Màu: {color.title}
							</Text>
						)}
						{!!size && (
							<Text fz="xs" c="gray.6">
								Kích thước: {size.title}
							</Text>
						)}
					</Group>
				</div>
				<Text fw={500} size="sm">
					{formatCurrency(Number(effectivePrice) * quantity)}
				</Text>
			</Flex>
		</Flex>
	)
}
