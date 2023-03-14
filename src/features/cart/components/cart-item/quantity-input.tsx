import { QuantityInput } from "@/components"
import { useUpdateCartItem } from "@/features/cart/cart.actions"
import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { useEffect } from "react"

export const CartItemQuantityInput = () => {
	const { cartItem, setIsMaxQuantityMet } = useCartItemContext()
	const {
		product_item_id: { quantity: stockQuantity },
		quantity: currentQuantity,
	} = cartItem

	const updateMutation = useUpdateCartItem()

	const handleUpdateQuantity = (nextVal: number) => {
		const {
			product_item_id: { quantity: maxQuantity },
		} = cartItem

		if (nextVal > maxQuantity) {
			setIsMaxQuantityMet(true)
			return
		} else {
			setIsMaxQuantityMet(false)
		}

		updateMutation.mutate({
			cart_item_id: cartItem.id,
			quantity: Math.min(nextVal, maxQuantity),
		})
	}

	useEffect(() => {
		if (!currentQuantity || !stockQuantity || !cartItem) return
		if (currentQuantity > stockQuantity) {
			updateMutation.mutate({
				cart_item_id: cartItem.id,
				quantity: stockQuantity,
			})
		}
	}, [stockQuantity, currentQuantity, cartItem])

	return (
		<QuantityInput
			currentValue={cartItem.quantity}
			handleUpdateQuantity={handleUpdateQuantity}
			size="sm"
			isLoading={updateMutation.isLoading}
		/>
	)
}
