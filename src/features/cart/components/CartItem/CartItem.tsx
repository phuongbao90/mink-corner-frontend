import { ProductCardImage } from "@/components"
import { QuantityInput } from "@/components/QuantityInput"
import { PRODUCT_PLACEHOLDER_IMAGE_ID } from "@/constant"
import { useRemoveCartItem, useUpdateCartItem, CartItem } from "@/features/cart"
import { useGetProductImages } from "@/hooks"
import { useBoundStore } from "@/store/useStore"
import { formatCurrency } from "@/utils"
import {
	ActionIcon,
	Box,
	Flex,
	Grid,
	Group,
	Space,
	Text,
	Title,
} from "@mantine/core"
import { useRouter } from "next/router"
import { useState } from "react"
import { Trash2 } from "react-feather"

const CartItemComponent = ({ item }: { item: CartItem }) => {
	const router = useRouter()
	const { coverImage } = useGetProductImages(undefined, item.product_item_id)
	const [isMaxQuantityMet, setIsMaxQuantityMet] = useState(false)
	const toggleIsSidebarCartVisible = useBoundStore(
		(s) => s.actions.toggleIsSidebarCartVisible
	)

	const updateMutation = useUpdateCartItem()
	const deleteMutation = useRemoveCartItem()

	const handleUpdateQuantity = (nextVal: number) => {
		const {
			product_item_id: { quantity: maxQuantity },
			quantity: currentQuantity,
		} = item

		if (nextVal > maxQuantity) {
			setIsMaxQuantityMet(true)
		} else {
			setIsMaxQuantityMet(false)
		}

		updateMutation.mutate({
			cart_item_id: item.id,
			quantity: Math.min(nextVal, maxQuantity),
		})
	}

	return (
		<Box>
			<Grid align="start" gutter="xs">
				<Grid.Col span={3}>
					<Box
						sx={{
							width: "100%",
							position: "relative",
							cursor: "pointer",
							borderRadius: 4,
							overflow: "hidden",
							aspectRatio: "0.9",
						}}
						onClick={() => {
							toggleIsSidebarCartVisible()
							router.push(`/products/${item.product_item_id.product.slug}`)
						}}
					>
						<ProductCardImage
							alt="product-image"
							src={coverImage ? coverImage.id : PRODUCT_PLACEHOLDER_IMAGE_ID}
							style={{
								objectFit: "cover",
							}}
						/>
					</Box>
				</Grid.Col>
				<Grid.Col span={9}>
					<Flex
						direction={{ base: "column", md: "row" }}
						gap={{ base: 0, md: "xl" }}
						justify="space-between"
					>
						<Box>
							<Title
								order={6}
								onClick={() => {
									toggleIsSidebarCartVisible()
									router.push(`/products/${item.product_item_id.product.slug}`)
								}}
								sx={(theme) => ({
									cursor: "pointer",
									[theme.fn.smallerThan("xs")]: {
										fontSize: 12,
									},
								})}
							>
								{item.product_item_id.product.name}
							</Title>
							<Group mt={2}>
								{!!item.product_item_id.color && (
									<Text fz="xs" c="gray.6">
										Màu: {item.product_item_id.color.title}
									</Text>
								)}
								{!!item.product_item_id.size && (
									<Text fz="xs" c="gray.6">
										Kích thước: {item.product_item_id.size.title}
									</Text>
								)}
							</Group>
						</Box>

						<Text
							fw={600}
							size="sm"
							mt={{ base: 6, md: 0 }}
							sx={(theme) => ({
								[theme.fn.smallerThan("xs")]: {
									fontSize: 12,
								},
							})}
						>
							{formatCurrency(Number(item.product_item_id.price))}
						</Text>
					</Flex>
					<Box
						sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
						mt={8}
					>
						<QuantityInput
							currentValue={item.quantity}
							handleUpdateQuantity={handleUpdateQuantity}
							size="sm"
							isLoading={updateMutation.isLoading}
						/>
						<Space w="xl" />
						<ActionIcon
							className="cursor-pointer"
							onClick={() => {
								deleteMutation.mutate(item.id)
							}}
							aria-label={`delete-button`}
						>
							<Trash2 size="20" />
						</ActionIcon>
					</Box>
					<Box>
						{isMaxQuantityMet && (
							<Text size="xs" color="red.6">
								Đã đạt hạn mức tối đa
							</Text>
						)}
					</Box>
				</Grid.Col>
			</Grid>
		</Box>
	)
}

export { CartItemComponent }
