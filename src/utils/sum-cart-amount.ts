import { CartItem } from "@/features/cart"
import { ceil, isEmpty } from "lodash"

export const sumCartAmount = (items: CartItem[] | null | undefined) => {
	if (!items || isEmpty(items)) return 0

	const total = items
		.filter((item) => item.product_item_id.quantity > 0)
		.reduce((acc, item) => {
			const { product_item_id } = item
			const { price, promotion_item } = product_item_id || {}

			//? PREFER product discount over category discount if overlapping
			const effective_promotion_item =
				promotion_item || product_item_id.product.category.promotion_item_id
			const isDiscounted = !!effective_promotion_item
			if (!isDiscounted) {
				acc = acc + product_item_id.price * item.quantity
				return acc
			}

			const { type, fixed_amount, percentage_rate } = effective_promotion_item
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
