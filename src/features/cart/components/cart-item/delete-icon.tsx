import { useRemoveCartItem } from "@/features/cart/cart.actions"
import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { ActionIcon } from "@mantine/core"
import { Trash2 } from "react-feather"

export const DeleteCartItemIcon = () => {
	const { cartItem } = useCartItemContext()
	const deleteMutation = useRemoveCartItem()

	return (
		<ActionIcon
			className="cursor-pointer"
			onClick={() => {
				deleteMutation.mutate(cartItem.id)
			}}
			aria-label={`delete-button`}
		>
			<Trash2 size="20" />
		</ActionIcon>
	)
}
