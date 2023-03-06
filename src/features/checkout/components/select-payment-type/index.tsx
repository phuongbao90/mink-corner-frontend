import { useGetAppConfigs } from "@/features/app"
import { useGetPaymentTypes } from "@/features/checkout/checkout.actions"
import { FormValues } from "@/features/checkout/templates"

import { replaceWithBr } from "@/utils"
import { Box, Radio, Text, Title } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"

export const PaymentMethodSelect = () => {
	const { data: paymentTypes, isSuccess } = useGetPaymentTypes()
	const {
		formState: { errors },
	} = useFormContext<FormValues>()

	// const { data: appConfigs, isSuccess: isAppConfigsSuccess } =
	// 	useGetAppConfigs()

	return (
		<Box>
			<Title order={5}>
				Phương thức thanh toán <span style={{ color: "red" }}>*</span>
			</Title>
			{!!errors.payment_method?.message && (
				<Text c="red.6" size="xs">
					Chưa chọn phương thức thanh toán
				</Text>
			)}

			<div>
				{isSuccess && (
					<Controller
						name="payment_method"
						render={({ field: { onChange } }) => (
							<Radio.Group
								withAsterisk
								orientation="vertical"
								onChange={onChange}
								offset="sm"
							>
								{paymentTypes.map((type) => (
									<Radio
										className="select-shipping-method-radio"
										key={type.id}
										value={type.id}
										label={<Text fw={600}>{type.name}</Text>}
										description={
											<div
												style={{ lineHeight: 1.55 }}
												dangerouslySetInnerHTML={{
													__html: replaceWithBr(type.detail),
												}}
											/>
										}
									/>
								))}
							</Radio.Group>
						)}
					/>
				)}
			</div>
		</Box>
	)
}
