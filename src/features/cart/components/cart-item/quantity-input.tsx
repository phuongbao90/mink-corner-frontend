import { QuantityInput } from "@/components"
import { useUpdateCartItem } from "@/features/cart/cart.actions"
import { useCartItemContext } from "@/features/cart/templates/cart-item"

export const CartItemQuantityInput = () => {
	const { cartItem, setIsMaxQuantityMet } = useCartItemContext()

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

	return (
		<QuantityInput
			currentValue={cartItem.quantity}
			handleUpdateQuantity={handleUpdateQuantity}
			size="sm"
			isLoading={updateMutation.isLoading}
		/>
	)
}
