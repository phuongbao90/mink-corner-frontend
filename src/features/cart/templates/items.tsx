import { useGetCart } from "@/features/cart/cart.actions"
import { CartItemComponent } from "@/features/cart/components"
import { Box, Divider } from "@mantine/core"

export const CartItemsTemplate = () => {
	const { data: cart, isSuccess } = useGetCart()

	if (isSuccess) {
		return (
			<div>
				{/* <Divider size="xl" sx={{ borderColor: "black", borderRadius: 4 }} /> */}
				<Box my={16}>
					<Box component="ul" aria-label="cart-list" sx={{ paddingLeft: 0 }}>
						{cart.items?.map((item, index) => (
							<Box
								component="li"
								aria-label={`cart-item-${index}`}
								key={item.id}
								mb="xs"
							>
								<CartItemComponent item={item} />
							</Box>
						))}
					</Box>
				</Box>
			</div>
		)
	}

	return null
}
