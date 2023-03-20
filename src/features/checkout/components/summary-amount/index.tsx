import { useGetCart } from "@/features/cart"
import { useGetShippingFee } from "@/features/checkout/checkout.actions"
import { ShippingMethod } from "@/features/checkout/checkout.types"
import { formatCurrency, sumCartAmount } from "@/utils"
import { Box, Group, Loader, Text } from "@mantine/core"
import { useWatch } from "react-hook-form"

export const CheckoutSumaryAmount = ({
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

	return (
		<Box>
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
				mt="xs"
			>
				<Text fw={700} size="md">
					Tổng
				</Text>
				<Text size="lg" fw={700}>
					{formatCurrency(subtotal + (shipping_fee || 0))}
				</Text>
			</Group>
		</Box>
	)
}
