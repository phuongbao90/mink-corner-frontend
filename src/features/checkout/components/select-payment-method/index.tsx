import { FormValues, useGetPaymentTypes } from "@/features/checkout"
import { replaceWithBr } from "@/utils"
import {
	Box,
	Button,
	CopyButton,
	Group,
	Radio,
	SimpleGrid,
	Text,
	Title,
	Tooltip,
	rem,
} from "@mantine/core"
import { Check, Copy } from "react-feather"
import { Controller, useFormContext, useWatch } from "react-hook-form"

export const SelectPaymentMethod = () => {
	const { data: paymentTypes, isSuccess } = useGetPaymentTypes()
	const {
		formState: { errors },
	} = useFormContext<FormValues>()

	const name = useWatch({ name: "name" })
	const phone_number = useWatch({ name: "phone_number" })

	const isFormFilled =
		name && name.length > 2 && phone_number && phone_number.length > 9

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
							{paymentTypes.map((type) => {
								if (type.value === "cod") {
									return (
										<Radio
											key={type.id}
											value={type.id}
											label={
												<Box pb={rem(12)}>
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
									)
								}

								return (
									<Radio
										key={type.id}
										value={type.id}
										label={
											<Box pb={rem(12)}>
												<Title order={3} tt="capitalize" fz="lg" fw={600}>
													{type.name}
												</Title>

												<Group>
													<Text fz="xs" lh={1.75} c="gray.7">
														Số tài khoản{": "}
													</Text>
													<CopyButton
														value={type.account_number}
														timeout={1000}
													>
														{({ copied, copy }) => (
															<Tooltip
																label={copied ? "Copied" : "Copy"}
																withArrow
																position="right"
																color="brown.5"
															>
																<Button
																	variant="subtle"
																	onClick={() => copy()}
																	rightIcon={
																		copied ? (
																			<Check size="1rem" />
																		) : (
																			<Copy size="1rem" />
																		)
																	}
																	compact
																	styles={{
																		root: {
																			"&:hover": {
																				backgroundColor:
																					"transparent !important",
																			},
																		},
																	}}
																>
																	{type.account_number}
																</Button>
															</Tooltip>
														)}
													</CopyButton>
												</Group>

												<Text fz="xs" lh={1.75} c="gray.7" mt={4} mb={7}>
													Chủ tài khoản{": "}
													<Text
														span
														fw="bold"
														ml="xs"
														c="brown.6"
														tt="uppercase"
													>
														{type.account_holder}
													</Text>
												</Text>
												<Box>
													<Text fz="xs" lh={1.75} c="gray.7">
														Nội dung CK{": "}
														{!isFormFilled && (
															<Text
																span
																fw="bold"
																c="brown.6"
																ml="xs"
																tt="uppercase"
															>
																Tên - Số điện thoại
															</Text>
														)}
													</Text>
													{isFormFilled && (
														<CopyButton
															value={`${name}-${phone_number}`}
															timeout={1000}
														>
															{({ copied, copy }) => (
																<Tooltip
																	label={copied ? "Copied" : "Copy"}
																	withArrow
																	position="right"
																	color="brown.5"
																>
																	<Text
																		c="brown.6"
																		fw="bold"
																		onClick={() => {
																			copy()
																		}}
																	>
																		{name} - {phone_number}{" "}
																		{copied ? (
																			<Check size="1rem" />
																		) : (
																			<Copy size="1rem" />
																		)}
																	</Text>
																</Tooltip>
															)}
														</CopyButton>
													)}
												</Box>
											</Box>
										}
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
								)
							})}
						</Radio.Group>
					)}
				/>
			)}
		</div>
	)
}
