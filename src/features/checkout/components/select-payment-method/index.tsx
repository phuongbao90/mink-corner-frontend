import { FormValues, useGetPaymentTypes } from "@/features/checkout"
import { replaceWithBr } from "@/utils"
import { Box, Radio, SimpleGrid, Text, Title } from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"

export const SelectPaymentMethod = () => {
	const { data: paymentTypes, isSuccess } = useGetPaymentTypes()
	const {
		formState: { errors },
	} = useFormContext<FormValues>()

	return (
		<div>
			<Title order={2} size="h4">
				Phương thức thanh toán <span style={{ color: "red" }}>*</span>
			</Title>
			{!!errors.payment_method?.message && (
				<Text c="red.6" size="xs">
					Vui lòng chọn phương thức thanh toán
				</Text>
			)}

			{isSuccess && (
				<Controller
					name="payment_method"
					defaultValue={1}
					render={({ field: { onChange, value } }) => (
						<Radio.Group
							onChange={(methodId: string) => onChange(parseInt(methodId))}
							defaultValue="1"
							mt="sm"
							inputContainer={(children) => (
								<SimpleGrid
									cols={1}
									breakpoints={[{ minWidth: "xs", cols: 2 }]}
								>
									{children}
								</SimpleGrid>
							)}
						>
							{paymentTypes.map((type) => (
								<Radio
									key={type.id}
									value={type.id}
									label={
										<Box>
											<Title order={3} tt="capitalize" fz="lg" fw={600}>
												{type.name}
											</Title>
											<Text
												fz="xs"
												lh={1.75}
												c="gray.7"
												dangerouslySetInnerHTML={{
													__html: replaceWithBr(type.detail),
												}}
											/>
										</Box>
									}
									// styles={(theme) => radioStyles(theme, value === +type.id)}
									styles={(theme) => ({
										body: {
											position: "relative",
											cursor: "pointer",
											boxShadow:
												value === +type.id
													? `0 0 0 3px ${theme.colors.brown[4]}`
													: "0 0 0 1px #dae1e9",
											borderRadius: 8,
											paddingRight: 4,
											paddingTop: 10,
											backgroundColor:
												value === +type.id
													? theme.colors.brown[0]
													: "transparent",
										},
										labelWrapper: {
											width: "100%",
										},
										label: {
											cursor: "pointer",
										},
										inner: {
											position: "absolute",
											right: 14,
										},
									})}
								/>
							))}
						</Radio.Group>
					)}
				/>
			)}
		</div>
	)
}
