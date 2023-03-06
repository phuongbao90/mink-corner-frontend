import { QuantityInput } from "@/components"
import {
	useAddCartItemMutation,
	useGetCart,
	useUpdateCartItem,
} from "@/features/cart"
import { OptionSelect, Product } from "@/features/products"
import { useProductContext, useProductState } from "@/store/context"
import { useBoundStore } from "@/store/useStore"
import { formatCurrency } from "@/utils"
import { Box, Button, Divider, Text, Title } from "@mantine/core"
import { isFunction, isNumber } from "lodash"
import { useEffect } from "react"

export const ProductActions = ({ product }: { product: Product }) => {
	const { product_item } = product
	const maxQuantityMet = useProductState().maxQuantityMet
	const quantity = useProductState().quantity
	const inStock = useProductState().inStock
	const selected_product_item = useProductState().selected_product_item
	const { data: cart } = useGetCart()
	const updateQuantity = useProductContext((s) => s.actions.updateQuantity)

	const updateCart = useUpdateCartItem()
	const createCartItem = useAddCartItemMutation()

	const toggleIsOverlayLoaderVisible = useBoundStore(
		(s) => s.actions.toggleIsOverlayLoaderVisible
	)
	const toggleIsSidebarCartVisible = useBoundStore(
		(s) => s.actions.toggleIsSidebarCartVisible
	)

	const checkIsSKUAlreadyInCart = (SKU: string) => {
		return cart?.items?.find((cartItem) => cartItem.product_item_id.SKU === SKU)
	}
	const turnOffOverlay = () => {
		toggleIsOverlayLoaderVisible(false)
	}

	const handleAddToCart = ({
		callbackOnSettled,
		callbackOnSuccess,
	}: {
		callbackOnSettled?: () => void
		callbackOnSuccess?: () => void
	}) => {
		if (!cart?.id || !selected_product_item?.id) {
			console.error(
				`invalid cartId: ${cart?.id} or selectedProductVariant?.id ${selected_product_item?.id}`
			)
			return
		}

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

	return (
		<div>
			<Title order={1} size="h4">
				{product?.name}
			</Title>
			<Text size="sm" fw="700" my={{ base: "sm", md: "xs" }} mih={22}>
				{selected_product_item?.price
					? formatCurrency(Number(selected_product_item?.price))
					: undefined}
			</Text>
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
				<Button
					variant="outline"
					onClick={() => {
						if (!inStock) {
							return
						}

						toggleIsOverlayLoaderVisible()
						handleAddToCart({
							callbackOnSuccess: () => {
								toggleIsSidebarCartVisible()
							},
						})
					}}
					// disabled={!inStock}
				>
					{inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
				</Button>
			</Box>
		</div>
	)
}
