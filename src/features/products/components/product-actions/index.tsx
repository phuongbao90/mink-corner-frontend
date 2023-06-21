import { useEffect } from "react"
import isFunction from "lodash/isFunction"

import { DiscountBadge, hiddenOnXs, QuantityInput } from "@/components"
import {
	Cart,
	CartItem,
	useAddCartItemMutation,
	useCreateCart,
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
import { formatCurrency, storage } from "@/utils"
import { Box, Button, Divider, Group, Text, Title } from "@mantine/core"
import { useCreateUser, useGetUser, User } from "@/features/user"
import {
	getUserIdExistInLocalStorage,
	saveUserIdToLocalStorage,
} from "@/utils/auth"

export const ProductActions = ({ product }: { product: Product }) => {
	const { data: user, refetch: refetchUser } = useGetUser()
	const createUserMutation = useCreateUser()

	// console.log("user ", user)

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

	// const { data: cart, refetch: refetchCart } = useGetCart()
	// console.log("🚀 ~ file: index.tsx:48 ~ ProductActions ~ cart:", cart)
	const createCartMutation = useCreateCart()

	const updateQuantity = useProductContext((s) => s.actions.updateQuantity)

	const updateCart = useUpdateCartItem()
	const createCartItem = useAddCartItemMutation()

	const [, { open: openOverlay, close: closeOverlay }] = useOverlayLoader()

	const [, { open: openSidebar }] = useCartSidebar()

	const checkIsSKUAlreadyInCart = (SKU: string) => {
		if (!cart || cart.items.length === 0) return

		return cart.items.find((cartItem) => cartItem.product_item_id.SKU === SKU)
	}

	const turnOffOverlay = () => {
		closeOverlay()
	}

	const updateExistingCartItem = async (foundCartItem: CartItem) => {
		console.log("updateExistingCartItem")

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
					// callbackOnSuccess && callbackOnSuccess()
				},
				onSettled: () => {
					turnOffOverlay()
					// if (callbackOnSettled && isFunction(callbackOnSettled)) {

					// 	callbackOnSettled()
					// }
				},
			}
		)
		return
	}

	const addNewCartItem = async () => {
		if (!cart) return

		console.log("addNewCartItem")

		createCartItem.mutate(
			{
				cart_id: cart?.id,
				product_item_id: Number(selected_product_item?.id),
				quantity: Number(quantity),
			},
			{
				onSuccess: async () => {
					// callbackOnSuccess && callbackOnSuccess()
				},
				onSettled: () => {
					turnOffOverlay()
					// if (callbackOnSettled && isFunction(callbackOnSettled)) {
					// 	callbackOnSettled()
					// }
				},
			}
		)
	}

	const validateCurrentUser = async () => {
		// refetchUser()
		console.log("validateCurrentUser ~ user->", user)

		if (!user) {
			await initNewUserAccount()
			return
		}

		// validateExistingCart()

		// console.log("validateCurrentUser ~ cart -> ", cart)
		// return cart
	}

	const initNewUserAccount = async () => {
		console.log("run initNewUserAccount ")

		await Promise.resolve()
			.then(async () => {
				const createdUser = await createUserMutation.mutateAsync()
				console.log(
					"🚀 ~ file: index.tsx:83 ~ .then ~ createdUser:",
					createdUser
				)
				saveUserIdToLocalStorage(createdUser)
				return createdUser
			})
			.then(async (createdUser) => {
				if (!createdUser) throw new Error("no user")

				console.log("runnnn`````")
				const createdCart = await createCartMutation.mutateAsync(createdUser.id)

				console.log("initNewUserAccount ~ cart -> ", createdCart)

				// refetchCart()

				return createdCart
			})
	}

	const handleAddItemToCart = (_cart: Cart) => {
		console.log("handleAddItemToCart ~ _cart  -> ", _cart)

		if (!selected_product_item) return

		// const foundCartItem = checkIsSKUAlreadyInCart(selected_product_item.SKU)

		// if (!foundCartItem) {
		addNewCartItem()
		return
		// }

		// updateExistingCartItem(foundCartItem)
	}

	const handleAddToCart = async () => {
		await Promise.resolve()
			.then(openOverlay)
			.then(validateCurrentUser)
			.then(handleAddItemToCart)

			// .then(openSidebar)
			// .then(closeOverlay)
			// .finally(openSidebar)
			.catch((err) => {
				console.error("errors ~ handleAddToCart -> ", err)
			})
	}

	// const handleAddToCart = async ({
	// 	callbackOnSettled,
	// 	callbackOnSuccess,
	// }: {
	// 	callbackOnSettled?: () => void
	// 	callbackOnSuccess?: () => void
	// }) => {
	// 	if (!user) {
	// 		const user = await createUser()
	// 		saveUserIdToLocalStorage(user)

	// 		if (user && user.id) {
	// 			const _cart = createCartMutation.mutate(user.id)
	// 		}
	// 	}

	// 	if (
	// 		!cart ||
	// 		!selected_product_item?.id ||
	// 		selected_product_item.quantity <= 0
	// 	) {
	// 		return
	// 	}

	// 	const foundCartItem = checkIsSKUAlreadyInCart(selected_product_item.SKU)
	// 	if (foundCartItem) {
	// 		const stockQuantity = foundCartItem.product_item_id.quantity
	// 		const updatedQuantity = Math.min(
	// 			foundCartItem.quantity + quantity,
	// 			stockQuantity
	// 		)
	// 		updateCart.mutate(
	// 			{
	// 				cart_item_id: foundCartItem.id,
	// 				quantity: updatedQuantity,
	// 			},
	// 			{
	// 				onSuccess: () => {
	// 					callbackOnSuccess && callbackOnSuccess()
	// 				},
	// 				onSettled: () => {
	// 					turnOffOverlay()
	// 					if (callbackOnSettled && isFunction(callbackOnSettled))
	// 						callbackOnSettled()
	// 				},
	// 			}
	// 		)
	// 		return
	// 	}
	// 	createCartItem.mutate(
	// 		{
	// 			cart_id: cart?.id,
	// 			product_item_id: Number(selected_product_item?.id),
	// 			quantity: Number(quantity),
	// 		},
	// 		{
	// 			onSuccess: async () => {
	// 				callbackOnSuccess && callbackOnSuccess()
	// 			},
	// 			onSettled: () => {
	// 				turnOffOverlay()
	// 				if (callbackOnSettled && isFunction(callbackOnSettled))
	// 					callbackOnSettled()
	// 			},
	// 		}
	// 	)
	// }

	useEffect(() => {
		return () => {
			turnOffOverlay()
		}
	}, [])

	const handleClickButton = () => {
		// if (!selected_product_item) {
		// 	notify({
		// 		type: "warning",
		// 		message: "Vui lòng chọn thuộc tính sản phẩm",
		// 	})
		// 	return
		// }
		// if (!inStock) {
		// 	notify({
		// 		type: "warning",
		// 		message: "Sản phẩm đã hết hàng",
		// 	})
		// 	return
		// }

		// toggleOverlay()
		// handleAddToCart({
		// 	callbackOnSuccess: () => {
		// 		open()
		// 	},
		// })
		handleAddToCart()
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
					{/* <Button onClick={handleClickButton}> */}
					<Button onClick={handleAddToCart}>
						{selected_product_item && selected_product_item?.quantity <= 0
							? "Hết hàng"
							: "Thêm vào giỏ hàng"}
					</Button>
				</Box>
			</Box>

			<BottomMenu
				product={product}
				selected_product_item={selected_product_item}
				handleClickButton={handleAddToCart}
			/>
		</div>
	)
}
