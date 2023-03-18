import { useGetUserAddress } from "@/features/user"
import { useCheckoutStore } from "@/store/use-checkout-store"
import {
	ActionIcon,
	Box,
	Collapse,
	Group,
	Radio,
	rem,
	Stack,
	Text,
	Title,
	Tooltip,
} from "@mantine/core"
import { useState } from "react"
import { Delete, Edit, PlusCircle, Trash, Trash2 } from "react-feather"

export const SelectUserAddress = () => {
	const { data: addresses, isLoading, isSuccess } = useGetUserAddress()
	const [opened, setOpened] = useState(false)
	console.log("🚀 ~ file: index.ts:5 ~ SelectUserAddress ~ address:", addresses)

	const selectedAddressId = useCheckoutStore((s) => s.selectedAddressId)
	const selectAddressId = useCheckoutStore((s) => s.actions.selectAddressId)

	const handleAddNewAddress = () => {
		if (addresses && addresses.length >= 3) return
	}

	return (
		<Box my="lg">
			<Group position="apart">
				<Title order={4}>
					Địa chỉ giao hàng <span style={{ color: "red" }}>*</span>
				</Title>
				<Box pr={rem(10)}>
					<Tooltip label="Lưu tối đa 3 địa chỉ" color="brown.4" withArrow>
						<ActionIcon
							color="brown.5"
							variant="transparent"
							onClick={handleAddNewAddress}
						>
							<PlusCircle />
						</ActionIcon>
					</Tooltip>
				</Box>
			</Group>

			<Radio.Group
				mt="lg"
				onChange={(val) => {
					selectAddressId(val)
				}}
			>
				{isSuccess &&
					addresses.map((address, index) => {
						return (
							<Radio
								key={address.id}
								value={address.id}
								label={
									<Box>
										<Box>
											<Text tt="capitalize" fz="md" fw={500}>
												{address.address}
											</Text>
											<Text tt="capitalize" fz="sm" fw={400}>
												{address.ward}, {address.district}, {address.city}
											</Text>
										</Box>
										<Group mt={4}>
											<ActionIcon
												size="sm"
												variant="transparent"
												color="blue.6"
												onClick={() => setOpened((prev) => !prev)}
											>
												<Edit />
											</ActionIcon>
											<ActionIcon size="sm" variant="transparent" color="red.7">
												<Trash2 />
											</ActionIcon>
										</Group>
									</Box>
								}
								mb={rem(16)}
								styles={(theme) => ({
									body: {
										position: "relative",
										cursor: "pointer",
										borderRadius: 8,
										paddingRight: 4,
										paddingTop: rem(10),
										paddingBottom: rem(10),
										boxShadow:
											selectedAddressId === address.id
												? `0 0 0 3px ${theme.colors.brown[4]}`
												: "0 0 0 1px #dae1e9",

										backgroundColor:
											selectedAddressId === address.id
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
										top: 10,
										right: 14,
									},
								})}
							/>
						)
					})}
			</Radio.Group>
		</Box>
	)
}
