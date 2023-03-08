import { useGetShippingFeeDiscount } from "@/features/checkout/checkout.actions"
import { ShippingMethod } from "@/features/checkout/checkout.types"
import { FormValues } from "@/features/checkout/templates"
import { formatCurrency } from "@/utils"
import { Group, Radio, Text, Title } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"

type Props = {
	shippingMethods?: ShippingMethod[]
	// selectShippingMethod: (id: string) => void
}
export const DeliveryMethodSelect = ({
	shippingMethods,
}: // selectShippingMethod,
Props) => {
	const {
		watch,
		formState: { errors },
	} = useFormContext<FormValues>()

	const city = watch("city")
	const district = watch("district")

	const { discount_shipping_fee } = useGetShippingFeeDiscount()

	return (
		<div>
			<Title order={5}>
				Phương thức vận chuyển <span style={{ color: "red" }}>*</span>
			</Title>
			{!!errors.shipping_method?.message && (
				<Text c="red.6" size="xs">
					Chưa chọn phương thức vận chuyển
				</Text>
			)}

			{!city && (
				<Text c="orange.6" size="xs">
					Vui lòng chọn tỉnh / thành để tính phí ship
				</Text>
			)}
			{!!city && !district && (
				<Text c="orange.6" size="xs">
					Vui lòng chọn quận / huyện để tính phí ship
				</Text>
			)}

			<Controller
				name="shipping_method"
				render={({ field: { onChange } }) => (
					<Radio.Group
						mt="sm"
						withAsterisk
						onChange={(id) => {
							onChange(id)
							// selectShippingMethod(id)
						}}
					>
						{shippingMethods?.map((method) => (
							<Radio
								mb={8}
								className="select-shipping-method-radio"
								key={method.id}
								value={method.id}
								display={district ? "block" : "none"}
								label={
									<Group position="apart">
										<Text fw={500}>{method.name}</Text>
										{!!discount_shipping_fee ? (
											<Text>
												<Text c="gray.6" td="line-through" span mr="sm">
													{formatCurrency(+method.price)}
												</Text>
												<Text span fw={600}>
													{formatCurrency(
														Math.max(+method.price - discount_shipping_fee, 0)
													)}
												</Text>
											</Text>
										) : (
											<Text fw={600}>{formatCurrency(+method.price)}</Text>
										)}
									</Group>
								}
								description={method.note}
							/>
						))}
					</Radio.Group>
				)}
			/>
		</div>
	)
}
