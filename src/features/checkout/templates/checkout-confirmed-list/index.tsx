import { useGetCart } from "@/features/cart"
import { CartItemTemplate } from "@/features/cart/templates/cart-item"
import { useGetShippingFee } from "@/features/checkout/checkout.actions"
import { ShippingMethod } from "@/features/checkout/checkout.types"
import { formatCurrency, sumCartAmount } from "@/utils"
import {
	Box,
	Divider,
	Group,
	Loader,
	Paper,
	Stack,
	Text,
	Title,
} from "@mantine/core"
import { useWatch } from "react-hook-form"

export const CheckoutConfirmList = ({
	selectedShippingMethod,
}: {
	selectedShippingMethod?: ShippingMethod
}) => {
	const { data: cart, isSuccess } = useGetCart()
	const subtotal = sumCartAmount(cart?.items)

	const selected_shipping_method_id: number = useWatch({
		name: "shipping_method",
	})

	const { shipping_fee } = useGetShippingFee(
		String(selected_shipping_method_id)
	)

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

						<Divider my={4} color="gray.2" />

						<Box px="md">
							<Group position="apart" mb={10}>
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
									<Loader size="xs" color="brown.6" />
								)}
							</Group>
						</Box>

						<Group
							position="apart"
							sx={(theme) => ({
								backgroundColor: theme.colors.brown[0],
								borderRadius: 8,
							})}
							py="xl"
							px="md"
						>
							<Text fw={700} size="md">
								Tổng
							</Text>
							<Text size="lg" fw={700}>
								{formatCurrency(subtotal + (shipping_fee || 0))}
							</Text>
						</Group>
					</Stack>
				</Paper>
			</>
		)
	}

	return null
}
