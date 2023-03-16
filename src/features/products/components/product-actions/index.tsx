import { useEffect } from "react"

import { isFunction } from "lodash"

import { DiscountBadge, hiddenOnXs, QuantityInput } from "@/components"
import {
	useAddCartItemMutation,
	useGetCart,
	useUpdateCartItem,
} from "@/features/cart"
import {
	BottomMenu,
	OptionSelect,
	Product,
	useProductPrice,
} from "@/features/products"
import { useNotify } from "@/hooks"
import { useProductContext, useProductState } from "@/store/context"
import { useCartSidebar, useOverlayLoader } from "@/store/use-ui-store"
import { formatCurrency } from "@/utils"
import { Box, Button, Divider, Group, Text, Title } from "@mantine/core"

export const ProductActions = ({ product }: { product: Product }) => {
	const { product_item } = product
	const maxQuantityMet = useProductState().maxQuantityMet
	const quantity = useProductState().quantity
	const inStock = useProductState().inStock
	const selected_product_item = useProductState().selected_product_item

	const { originalPrice, effectivePrice, isDiscounted } = useProductPrice(
		selected_product_item,
		product.category.promotion_item_id
	)

	const notify = useNotify()

	const { data: cart } = useGetCart()
	const updateQuantity = useProductContext((s) => s.actions.updateQuantity)

	const updateCart = useUpdateCartItem()
	const createCartItem = useAddCartItemMutation()

	const [, { open: openOverlay, close: closeOverlay, toggle: toggleOverlay }] =
		useOverlayLoader()

	const [, { open }] = useCartSidebar()

	const checkIsSKUAlreadyInCart = (SKU: string) => {
		return cart?.items?.find((cartItem) => cartItem.product_item_id.SKU === SKU)
	}
	const turnOffOverlay = () => {
		closeOverlay()
	}

	const handleAddToCart = ({
		callbackOnSettled,
		callbackOnSuccess,
	}: {
		callbackOnSettled?: () => void
		callbackOnSuccess?: () => void
	}) => {
		if (
			!cart?.id ||
			!selected_product_item?.id ||
			selected_product_item.quantity <= 0
		)
			return

		const foundCartItem = checkIsSKUAlreadyInCart(selected_product_item.SKU)

		if (foundCartItem) {
			const stockQuantity = foundCartItem.product_item_id.quantity

			const updatedQuantity = Math.min(
				foundCartItem.quantity + quantity,
				stockQuantity
			)

			updateCart.mutate(
				{
					cart_item_id: foundCartItem.id,
					quantity: updatedQuantity,
				},
				{
					onSuccess: () => {
						callbackOnSuccess && callbackOnSuccess()
					},
					onSettled: () => {
						turnOffOverlay()
						if (callbackOnSettled && isFunction(callbackOnSettled))
							callbackOnSettled()
					},
				}
			)
			return
		}

		createCartItem.mutate(
			{
				cart_id: cart?.id,
				product_item_id: Number(selected_product_item?.id),
				quantity: Number(quantity),
			},
			{
				onSuccess: async () => {
					callbackOnSuccess && callbackOnSuccess()
				},
				onSettled: () => {
					turnOffOverlay()
					if (callbackOnSettled && isFunction(callbackOnSettled))
						callbackOnSettled()
				},
			}
		)
	}

	useEffect(() => {
		return () => {
			turnOffOverlay()
		}
	}, [])

	const handleClickButton = () => {
		if (!selected_product_item) {
			notify({
				type: "warning",
				message: "Vui lòng chọn thuộc tính sản phẩm",
			})
			return
		}
		if (!inStock) {
			notify({
				type: "warning",
				message: "Sản phẩm đã hết hàng",
			})
			return
		}

		toggleOverlay()
		handleAddToCart({
			callbackOnSuccess: () => {
				open()
			},
		})
	}

	return (
		<div>
			<Box sx={[hiddenOnXs]}>
				<Title order={1} size="h4">
					{product?.name}
				</Title>

				<Group align="baseline" my={{ base: "sm", md: "xs" }} spacing="xs">
					{isDiscounted && (
						<Text size="sm" fw="400" mih={22} td="line-through" c="gray.6">
							{formatCurrency(Number(originalPrice))}
						</Text>
					)}

					<Text size="sm" fw="700" mih={22}>
						{effectivePrice ? formatCurrency(Number(effectivePrice)) : null}
					</Text>
					{!!selected_product_item?.promotion_item && (
						<DiscountBadge
							discountAmount={
								selected_product_item.promotion_item.type === "percentage"
									? selected_product_item.promotion_item.percentage_rate + "%"
									: formatCurrency(
											selected_product_item.promotion_item.fixed_amount
									  )
							}
						/>
					)}
				</Group>
				<Text size="xs">SKU: {selected_product_item?.SKU || product?.SKU}</Text>

				<Divider my="lg" />

				<Box my={16}>
					{product_item && product_item.length > 1 && (
						<OptionSelect product={product} />
					)}
				</Box>

				<Box my={8} sx={{ display: "flex", alignItems: "center" }}>
					<QuantityInput
						currentValue={quantity}
						handleUpdateQuantity={(nextQuantity: number) => {
							updateQuantity(nextQuantity)
						}}
					/>
					{maxQuantityMet && (
						<Text ml={12} c="red.5">
							Đã đạt hạn mức tối đa
						</Text>
					)}
				</Box>
				<Box mt={{ base: "xl" }}>
					<Button onClick={handleClickButton}>
						{selected_product_item && selected_product_item?.quantity <= 0
							? "Hết hàng"
							: "Thêm vào giỏ hàng"}
					</Button>
				</Box>
			</Box>

			<BottomMenu
				product={product}
				selected_product_item={selected_product_item}
				handleClickButton={handleClickButton}
			/>
		</div>
	)
}
