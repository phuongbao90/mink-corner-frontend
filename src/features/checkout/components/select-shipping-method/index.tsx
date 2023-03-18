import { IconImage } from "@/components"
import { useGetShippingFeeDiscount } from "@/features/checkout/checkout.actions"
import { ShippingMethod } from "@/features/checkout/checkout.types"
import { FormValues } from "@/features/checkout/templates"
import { formatCurrency } from "@/utils"
import {
	Box,
	Center,
	Grid,
	Group,
	Radio,
	rem,
	Text,
	Title,
} from "@mantine/core"
import { Controller, useFormContext } from "react-hook-form"

type Props = {
	shippingMethods?: ShippingMethod[]
}
export const SelectShippingMethod = ({ shippingMethods }: Props) => {
	const {
		watch,
		formState: { errors },
	} = useFormContext<FormValues>()

	const city = watch("city")

	const { discount_shipping_fee } = useGetShippingFeeDiscount()

	return (
		<div>
			<Title order={4}>
				Phương thức vận chuyển <span style={{ color: "red" }}>*</span>
			</Title>
			<Box mt="xs">
				<Text c="red.6" size="xs">
					{!!errors.shipping_method?.message && (
						<Text>Chưa chọn phương thức vận chuyển</Text>
					)}
					{!city && <Text>Vui lòng chọn tỉnh / thành để tính phí ship</Text>}
				</Text>
			</Box>

			<Controller
				name="shipping_method"
				render={({ field: { onChange, value } }) => (
					<Radio.Group mt="sm" onChange={(methodId) => onChange(+methodId)}>
						{shippingMethods?.map((method) => {
							const isFastShipping = method.id === "3"
							return (
								<Radio
									mb={rem(16)}
									key={method.id}
									value={method.id}
									display={city ? "block" : "none"}
									label={
										<Grid gutter={14} gutterMd={0}>
											<Grid.Col span={2}>
												{method?.cover_image?.id ? (
													<Center h="100%" w="100%">
														<Box sx={{ position: "relative" }} h={55} w="100%">
															<IconImage
																alt="icon-image"
																src={method?.cover_image?.id}
																fill
															/>
														</Box>
													</Center>
												) : null}
											</Grid.Col>
											<Grid.Col span={10}>
												<Title order={5} fw={500}>
													{method.name}
												</Title>
												<Group mb={2}>
													{isFastShipping ? null : (
														<>
															<Text span fw={600}>
																{formatCurrency(
																	Math.max(
																		+method.price - discount_shipping_fee,
																		0
																	)
																)}
															</Text>
															{!!discount_shipping_fee && (
																<Text c="gray.6" td="line-through" span>
																	{formatCurrency(+method.price)}
																</Text>
															)}
														</>
													)}
												</Group>
												<Text fz="xs" c="gray.7">
													{method.note}
												</Text>
											</Grid.Col>
										</Grid>
									}
									styles={(theme) => ({
										body: {
											position: "relative",
											cursor: "pointer",
											boxShadow:
												value === +method.id
													? `0 0 0 3px ${theme.colors.brown[4]}`
													: "0 0 0 1px #dae1e9",
											borderRadius: 8,
											paddingRight: 4,
											paddingTop: 10,
											paddingBottom: 10,
											minHeight: 85,
											backgroundColor:
												value === +method.id
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
							)
						})}
					</Radio.Group>
				)}
			/>
		</div>
	)
}
