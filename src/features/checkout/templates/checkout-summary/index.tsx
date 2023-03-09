import { useGetCart } from "@/features/cart"
import { CartItemTemplate } from "@/features/cart/templates/cart-item"
import { useGetShippingFee } from "@/features/checkout/checkout.actions"
import { ShippingMethod } from "@/features/checkout/checkout.types"
import { formatCurrency, sumCartAmount } from "@/utils"
import { Box, Divider, Group, Stack, Text } from "@mantine/core"
import { useWatch } from "react-hook-form"

export const CheckoutSummary = ({
	selectedShippingMethod,
}: {
	selectedShippingMethod?: ShippingMethod
}) => {
	const { data: cart, isSuccess } = useGetCart()
	const subtotal = sumCartAmount(cart?.items)

	const selected_shipping_method_id = useWatch({ name: "shipping_method" })
	const { shipping_fee } = useGetShippingFee(selected_shipping_method_id)

	if (isSuccess) {
		return (
			<Stack>
				{cart.items?.map((item, index) => (
					<Box mb={4} key={index}>
						<CartItemTemplate cartItem={item}>
							<CartItemTemplate.ImageContainer>
								<CartItemTemplate.QuantityIndicator>
									<CartItemTemplate.Image />
								</CartItemTemplate.QuantityIndicator>
							</CartItemTemplate.ImageContainer>
							<CartItemTemplate.DetailContainer>
								<Group position="apart">
									<CartItemTemplate.Title />
									<CartItemTemplate.Price />
								</Group>
								<CartItemTemplate.Option />
							</CartItemTemplate.DetailContainer>
						</CartItemTemplate>
					</Box>
				))}

				<Divider my={4} />

				<Box>
					<Group position="apart" mb={6}>
						<Text size="sm">Tạm tính</Text>
						<Text size="sm" fw={500}>
							{formatCurrency(subtotal)}
						</Text>
					</Group>

					<Group position="apart">
						<Box>
							<Text size="sm">Phí vận chuyển</Text>
						</Box>
						{selectedShippingMethod ? (
							<Text size="sm" fw={500}>
								{formatCurrency(shipping_fee)}
							</Text>
						) : (
							"--"
						)}
					</Group>
				</Box>

				<Divider my={4} />

				<Group position="apart">
					<Text size="sm">Tổng cộng</Text>
					<Text size="sm" fw={500}>
						{formatCurrency(subtotal + (shipping_fee || 0))}
					</Text>
				</Group>
			</Stack>
		)
	}

	return null
}
