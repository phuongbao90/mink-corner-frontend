import { Cart } from "@/features/cart/cart.types"
import { CartItemTemplate } from "@/features/cart/templates/cart-item"
import { Box, Group } from "@mantine/core"

export const CartItemList = ({ cart }: { cart: Cart }) => {
	if (cart) {
		return (
			<Box my={16}>
				<Box component="ul" aria-label="cart-list" sx={{ paddingLeft: 0 }}>
					{cart.items?.map((item, index) => (
						<Box
							component="li"
							aria-label={`cart-item-${index}`}
							key={item.id}
							mb="xs"
						>
							<CartItemTemplate cartItem={item}>
								<CartItemTemplate.ImageContainer>
									<CartItemTemplate.Image />
								</CartItemTemplate.ImageContainer>
								<CartItemTemplate.DetailContainer>
									<Group position="apart">
										<CartItemTemplate.Title />
										<CartItemTemplate.Price />
									</Group>
									<CartItemTemplate.Option />
									<Group mt="xs">
										<CartItemTemplate.QuantityInput />
										<CartItemTemplate.DeleteIcon />
									</Group>
									<Box mt="xs">
										<CartItemTemplate.MaxQuantityReachedMessage />
									</Box>
								</CartItemTemplate.DetailContainer>
							</CartItemTemplate>
						</Box>
					))}
				</Box>
			</Box>
		)
	}

	return null
}
