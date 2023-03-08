import { ceil, isEmpty } from "lodash"
import { CartItem } from "@/features/cart"

export const useSumCartItems = (items: CartItem[] | undefined): number => {
	if (!items || isEmpty(items)) return 0

	const total = items.reduce((acc, item) => {
		const { product_item_id } = item
		const { price, promotion_item } = product_item_id || {}
		const isDiscounted = !!promotion_item
		if (!isDiscounted) {
			acc = acc + product_item_id.price * item.quantity
			return acc
		}

		const { type, fixed_amount, percentage_rate } = promotion_item
		if (type === "percentage") {
			const discountedAmount = ceil(
				Math.abs(price * (Number(percentage_rate) / 100)),
				-3
			)

			acc = acc + (price - discountedAmount) * item.quantity
		}

		if (type === "amount") {
			acc = acc + (price - Number(fixed_amount)) * item.quantity
		}

		return acc
	}, 0)

	return total
}
