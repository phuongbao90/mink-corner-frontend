import {
	useGetUserAddress,
	useRemoveUserAddress,
	useUpdateUserAddress,
} from "@/features/user"
import { useCheckoutStore } from "@/store/use-checkout-store"
import {
	ActionIcon,
	Box,
	Group,
	Radio,
	rem,
	SimpleGrid,
	Stack,
	Text,
} from "@mantine/core"
import { Edit, Trash2 } from "react-feather"
import { useFormContext } from "react-hook-form"

export const SelectUserAddress = () => {
	const { data: addresses } = useGetUserAddress()
	const methods = useFormContext()

	const selectedAddress = useCheckoutStore((s) => s.selectedAddress)
	const { selectAddress, setIsEditingAddress } = useCheckoutStore(
		(s) => s.actions
	)
	const deleteMutation = useRemoveUserAddress()

	return (
		<Radio.Group
			pb={rem(10)}
			value={selectedAddress?.id}
			onChange={(addressId) => {
				const found = addresses?.find((el) => el.id === addressId)
				methods.setValue("shipping_method", -1)
				if (found) {
					selectAddress(found)

					methods.setValue("address", found.address)
					methods.setValue("city", found.city?.id)
					methods.setValue("district", found.district?.id)
					methods.setValue("ward", found.ward?.id)
				}
			}}
			inputContainer={(children) => (
				<SimpleGrid
					cols={1}
					breakpoints={[
						{ minWidth: "xs", cols: 2 },
						{ minWidth: "sm", cols: 3 },
					]}
				>
					{children}
				</SimpleGrid>
			)}
		>
			{addresses?.map((address) => {
				return (
					<Radio
						key={address.id}
						value={address.id}
						label={
							<Stack spacing={rem(8)} h="100%">
								<Box>
									<Text
										tt="capitalize"
										fz="sm"
										fw={500}
										lineClamp={2}
										sx={{ width: "80%" }}
									>
										{address.address}
									</Text>
									<Text
										tt="capitalize"
										fz="sm"
										fw={400}
										c="gray.6"
										w="85%"
										lh={1.15}
										mt={8}
									>
										{address?.ward?.name}, {address?.district?.name}{" "}
										<Text>{address?.city?.name}</Text>
									</Text>
								</Box>
								<Group mt="auto">
									<ActionIcon
										size="sm"
										variant="transparent"
										color="blue.6"
										onClick={() => {
											setIsEditingAddress(true)
											selectAddress(address)
										}}
									>
										<Edit />
									</ActionIcon>
									<ActionIcon
										size="sm"
										variant="transparent"
										color="red.7"
										onClick={() => {
											deleteMutation.mutate(address.id)
										}}
									>
										<Trash2 />
									</ActionIcon>
								</Group>
							</Stack>
						}
						styles={(theme) => ({
							root: {},
							body: {
								height: "100%",
								position: "relative",
								cursor: "pointer",
								borderRadius: 8,
								paddingRight: 4,
								paddingTop: rem(10),
								paddingBottom: rem(10),
								boxShadow:
									selectedAddress?.id === address.id
										? `0 0 0 3px ${theme.colors.brown[4]}`
										: "0 0 0 1px #dae1e9",

								backgroundColor:
									selectedAddress?.id === address.id
										? theme.colors.brown[0]
										: "transparent",
							},
							labelWrapper: {
								width: "100%",
							},
							label: {
								cursor: "pointer",
								height: "100%",
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
	)
}
