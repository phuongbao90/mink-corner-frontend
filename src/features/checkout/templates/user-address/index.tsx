import {
	SelectUserAddress,
	UserAddressForm,
} from "@/features/checkout/components"
import { FormValues } from "@/features/checkout/templates"
import { useGetUserAddress } from "@/features/user"
import { useCheckoutStore } from "@/store/use-checkout-store"
import { ActionIcon, Box, Group, Title, Tooltip, rem } from "@mantine/core"
import { Plus, X } from "react-feather"
import { useFormContext } from "react-hook-form"

export const UserAddress = () => {
	const { setValue, clearErrors } = useFormContext<FormValues>()

	const selectedAddress = useCheckoutStore((s) => s.selectedAddress)
	const isEditingAddress = useCheckoutStore((s) => s.isEditingAddress)
	const isCreatingAddress = useCheckoutStore((s) => s.isCreatingAddress)
	const { setIsCreatingAddress } = useCheckoutStore((s) => s.actions)

	const { data: addresses, isSuccess } = useGetUserAddress()
	const hasAddress = addresses && addresses?.length > 0

	const toggleCreateAddress = () => {
		if (addresses && addresses.length >= 3) return
		clearErrors()
		setIsCreatingAddress(!isCreatingAddress)
		setValue("shipping_method", -1)

		if (!isCreatingAddress) {
			setValue("address", "")
			setValue("city", "")
			setValue("district", "")
			setValue("ward", "")
		}
	}

	const renderContent = () => {
		if (!isSuccess) return null

		if (isEditingAddress || isCreatingAddress) {
			return <UserAddressForm />
		}

		if (hasAddress) {
			return <SelectUserAddress />
		}

		return <UserAddressForm />
	}

	return (
		<Box>
			<Group position="apart" mb="sm">
				<Title order={4}>
					Địa chỉ <span style={{ color: "red" }}>*</span>
				</Title>
				{!isEditingAddress && (
					<Box pr={rem(10)} sx={{ display: hasAddress ? "block" : "none" }}>
						<Tooltip
							label="Lưu tối đa 3 địa chỉ"
							color="brown.4"
							withArrow
							events={{ hover: true, focus: true, touch: true }}
						>
							<ActionIcon
								color="brown.5"
								variant="transparent"
								onClick={toggleCreateAddress}
							>
								{isCreatingAddress ? <X /> : <Plus />}
							</ActionIcon>
						</Tooltip>
					</Box>
				)}
			</Group>
			<Box>{renderContent()}</Box>
		</Box>
	)
}
