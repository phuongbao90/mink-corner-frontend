import { useGetCart } from "@/features/cart"
import { CartItemTemplate } from "@/features/cart/templates/cart-item"
import { Box, Group, Paper, Stack, Title } from "@mantine/core"
import { ReactNode } from "react"

export const CheckoutConfirmList = ({ children }: { children: ReactNode }) => {
	const { data: cart, isSuccess } = useGetCart()

	if (isSuccess) {
		return (
			<>
				<Paper p="md" shadow="md" withBorder radius="lg">
					<Title mb="md" order={4}>
						Đơn hàng của bạn
					</Title>

					<Stack>
						{cart.items
							?.filter((el) => el.product_item_id.quantity > 0)
							?.map((item, index) => (
								<Box mb={4} key={index}>
									<CartItemTemplate cartItem={item}>
										<CartItemTemplate.ImageContainer>
											<CartItemTemplate.QuantityIndicator>
												<CartItemTemplate.Image sx={{ aspectRatio: "1" }} />
											</CartItemTemplate.QuantityIndicator>
										</CartItemTemplate.ImageContainer>
										<CartItemTemplate.DetailContainer>
											<Group position="apart" noWrap align="flex-start">
												<CartItemTemplate.Title lineClamp={2} />
												<CartItemTemplate.Price />
											</Group>
											<CartItemTemplate.Option />
										</CartItemTemplate.DetailContainer>
									</CartItemTemplate>
								</Box>
							))}

						{children}
					</Stack>
				</Paper>
			</>
		)
	}

	return null
}
