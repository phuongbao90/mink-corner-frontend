import { DirectusImage } from "@/components"
import { useGetCart } from "@/features/cart"
import { useGetShippingFee } from "@/features/checkout/checkout.actions"
import { ShippingMethod } from "@/features/checkout/checkout.types"
import { formatCurrency } from "@/utils"
import {
	Box,
	Divider,
	Flex,
	Group,
	Indicator,
	Stack,
	Text,
} from "@mantine/core"
import { useWatch } from "react-hook-form"

export const CheckoutSummary = ({
	selectedShippingMethod,
}: {
	selectedShippingMethod?: ShippingMethod
}) => {
	const { data: cart, isSuccess } = useGetCart()

	const selected_shipping_method_id = useWatch({ name: "shipping_method" })
	const { shipping_fee } = useGetShippingFee(selected_shipping_method_id)

	if (isSuccess) {
		return (
			<Stack>
				{cart.items?.map((item, index) => (
					<Box mb={4} key={index}>
						<Flex align="center">
							<Box sx={{ position: "relative" }}>
								<Indicator
									label={<Text size={10}>{item.quantity}</Text>}
									color="red.6"
									size={16}
									zIndex={2}
								>
									<Box w={80} h={80}>
										<DirectusImage
											alt="product-image"
											src={String(
												item.product_item_id.cover_image?.id ||
													item.product_item_id?.product?.cover_image?.id
											)}
											sizes="10vw"
											style={{
												objectFit: "cover",
												borderRadius: 8,
											}}
										/>
									</Box>
								</Indicator>
							</Box>
							<Flex justify="space-between" ml="sm" sx={{ width: "100%" }}>
								<div>
									<Text size="sm" lineClamp={2}>
										{item.product_item_id.product.name}
									</Text>
									{item.product_item_id.options.length > 1 && (
										<Text>
											{item.product_item_id.options.map((el) => (
												<Text
													span
													key={el.variation_id.title}
													mr="xs"
													size="xs"
													color="gray.6"
												>
													{el.variation_id.option_id.title}:{" "}
													{el.variation_id.title}
												</Text>
											))}
										</Text>
									)}
								</div>
								<Text fw={500} size="sm">
									{formatCurrency(+item.product_item_id.price * item.quantity)}
								</Text>
							</Flex>
						</Flex>
					</Box>
				))}

				<Divider my={4} />

				<Box>
					<Group position="apart" mb={6}>
						<Text size="sm">Tạm tính</Text>
						<Text size="sm" fw={500}>
							{formatCurrency(cart.subtotal)}
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
						{formatCurrency(cart.subtotal + (shipping_fee || 0))}
					</Text>
				</Group>
			</Stack>
		)
	}

	return null
}
