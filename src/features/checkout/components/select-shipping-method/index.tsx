import { IconImage } from "@/components"
import {
	useGetShippingFeeDiscount,
	useGetShippingMethods,
} from "@/features/checkout/checkout.actions"
import { FormValues } from "@/features/checkout/templates"
import { useCheckoutStore } from "@/store/use-checkout-store"
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
import { Controller, useFormContext, useWatch } from "react-hook-form"

const HCM_CITY_ID = "202"

export const SelectShippingMethod = () => {
	const selectedCityId = useWatch({ name: "city" })
	const selectedAddress = useCheckoutStore((s) => s.selectedAddress)
	const {
		control,
		formState: { errors },
	} = useFormContext<FormValues>()

	const { data: shippingMethods } = useGetShippingMethods()
	const { discount_shipping_fee } = useGetShippingFeeDiscount()

	return (
		<div>
			<Title order={2} size="h4">
				Phương thức vận chuyển <span style={{ color: "red" }}>*</span>
			</Title>
			<Box mt="xs">
				<Text c="red.6" size="xs">
					{!!errors.shipping_method?.message && (
						<Text>Chưa chọn phương thức vận chuyển</Text>
					)}
					{!selectedCityId && (
						<Text>Vui lòng chọn tỉnh / thành để tính phí ship</Text>
					)}
				</Text>
			</Box>

			<Controller
				control={control}
				name="shipping_method"
				render={({ field: { onChange, value, ref, name } }) => {
					return (
						<Radio.Group
							name={name}
							mt="sm"
							onChange={(methodId) => onChange(+methodId)}
							value={String(value)}
							ref={ref}
						>
							{shippingMethods
								?.filter((method) => {
									if (!selectedCityId && !selectedAddress) return
									const isHCMSelected =
										selectedCityId === HCM_CITY_ID ||
										selectedAddress?.city?.id === HCM_CITY_ID

									if (isHCMSelected) return method.applicable_to === HCM_CITY_ID
									else return method.applicable_to !== HCM_CITY_ID
								})
								?.map((method) => {
									const isFastShipping = method.id === "3"
									return (
										<Radio
											mb={rem(16)}
											key={method.id}
											value={method.id}
											display={selectedCityId ? "block" : "none"}
											label={
												<Grid gutter={14} gutterMd={0}>
													<Grid.Col span={2}>
														{method?.cover_image?.id ? (
															<Center h="100%" w="100%">
																<Box
																	sx={{ position: "relative" }}
																	h={55}
																	w="100%"
																>
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
					)
				}}
			/>
		</div>
	)
}
