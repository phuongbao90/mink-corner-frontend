import { Button, Group, Select } from "@mantine/core"
import { FormValues } from "@/features/checkout/templates"
import { useFormContext, Controller } from "react-hook-form"
import { useGetCities, useGetDistricts, useGetWards } from "@/features/checkout"
import { Box, SimpleGrid, Text, TextInput } from "@mantine/core"
import { Plus, X } from "react-feather"
import {
	UserAddress,
	useCreateUserAddress,
	useGetUserAddress,
	useUpdateUserAddress,
} from "@/features/user"
import { useEffect } from "react"
import { useCheckoutStore } from "@/store/use-checkout-store"
import { storage } from "@/utils"

export const UserAddressForm = () => {
	const {
		register,
		formState: { errors },
		control,
		setValue,
		watch,
		getValues,
	} = useFormContext<FormValues>()
	const city = watch("city")
	const district = watch("district")
	const { data: addresses, isLoading, isSuccess } = useGetUserAddress()
	const hasAddress = addresses && addresses?.length > 0
	const createAddressMutation = useCreateUserAddress()
	const updateMutation = useUpdateUserAddress()

	const selectedAddress = useCheckoutStore((s) => s.selectedAddress)
	const isEditingAddress = useCheckoutStore((s) => s.isEditingAddress)
	const isCreatingAddress = useCheckoutStore((s) => s.isCreatingAddress)
	const { selectAddress, setIsEditingAddress, setIsCreatingAddress } =
		useCheckoutStore((s) => s.actions)

	/* -------------------------------------------------------------------------- */
	const { data: cities } = useGetCities()
	const { data: districts, isFetching: isFetchingDistricts } =
		useGetDistricts(city)
	const { data: wards, isFetching: isFetchingWards } = useGetWards(district)

	const cityOptions = cities?.map((city) => ({
		value: city.id,
		label: city.ten_tinh_thanh,
	}))
	const districtOptions = districts?.map((district) => ({
		value: district.id,
		label: district.ten_quan_huyen,
	}))
	const wardOptions = wards?.map((ward) => ({
		value: ward.id,
		label: ward.ten_xa_phuong,
	}))
	/* -------------------------------------------------------------------------- */

	const clearFormValues = () => {
		setValue("address", "")
		setValue("city", "")
		setValue("district", "")
		setValue("ward", "")
	}

	const setFormValues = (data: UserAddress) => {
		setValue("address", data?.address)
		setValue("city", data?.city.id)
		setValue("district", data?.district.id)
		setValue("ward", data?.ward.id)
	}

	const closeForm = () => {
		setIsEditingAddress(false)
		setIsCreatingAddress(false)
	}

	const handleCancelUpdate = () => {
		clearFormValues()
		selectAddress(null)
		closeForm()
	}

	const handleUpdateAddress = () => {
		if (!selectedAddress) return
		const { address, city, district, ward } = getValues()

		const data = {
			id: selectedAddress?.id,
			address,
			city,
			district,
			ward,
		}

		updateMutation.mutate(data, {
			onSuccess: ({ data }) => {
				let _data = data as UserAddress

				setFormValues(_data)
				selectAddress(_data)
				closeForm()
			},
		})
	}

	const handleCreateAddress = () => {
		const { address, city, district, ward } = getValues()
		const userId = storage.getItem("user_id")

		const createData = {
			address,
			city,
			district,
			ward,
			user: {
				id: userId,
			},
		}

		createAddressMutation.mutate(createData, {
			onSuccess: ({ data }) => {
				let _data = data as UserAddress

				setFormValues(_data)
				selectAddress(_data)
				closeForm()
			},
		})
	}

	/* -------------------------------------------------------------------------- */
	useEffect(() => {
		if (!selectedAddress) return
		setFormValues(selectedAddress)
	}, [selectedAddress])

	return (
		<Box>
			<TextInput
				mb="xs"
				withAsterisk
				label="Địa chỉ"
				autoComplete="off"
				error={errors?.address?.message}
				{...register("address", { required: true })}
			/>

			<SimpleGrid
				mb="xs"
				cols={1}
				breakpoints={[
					{ minWidth: "xs", cols: 2 },
					{ minWidth: "sm", cols: 3 },
				]}
			>
				<Controller
					control={control}
					name="city"
					render={({ field: { onChange, value, name, ref } }) => (
						<Select
							label="Thành phố"
							withAsterisk
							ref={ref}
							name={name}
							data={cityOptions || []}
							onChange={(cityId) => {
								onChange(cityId)
								setValue("district", "")
								setValue("ward", "")
								setValue("shipping_method", 1)
							}}
							placeholder="Chọn tỉnh / thành"
							value={value}
							error={
								errors?.city?.message ? <Text>Chưa chọn Thành phố</Text> : null
							}
							searchable
							maxDropdownHeight={400}
							nothingFound="Không tìm thấy"
						/>
					)}
				/>

				<Controller
					control={control}
					name="district"
					render={({ field: { onChange, value, name, ref } }) => {
						return (
							<Select
								ref={ref}
								value={value}
								name={name}
								label="Quận huyện"
								withAsterisk
								placeholder={"Chọn quận / huyện"}
								onChange={(districtId) => {
									setValue("ward", "")
									onChange(districtId)
								}}
								data={districtOptions || []}
								disabled={!city || isFetchingDistricts}
								searchable
								maxDropdownHeight={400}
								nothingFound="Không tìm thấy"
								error={
									errors?.district?.message ? (
										<Text>Chưa chọn quận / huyện</Text>
									) : null
								}
							/>
						)
					}}
				/>

				<Controller
					control={control}
					name="ward"
					render={({ field: { onChange, value, name, ref } }) => (
						<Select
							ref={ref}
							label="Phường xã"
							withAsterisk
							name={name}
							placeholder={"Chọn phường / xã"}
							value={value}
							onChange={onChange}
							data={wardOptions || []}
							disabled={!district || isFetchingWards}
							error={
								errors?.ward?.message ? (
									<Text>Chưa chọn Phường / Xã</Text>
								) : null
							}
							searchable
							maxDropdownHeight={400}
							nothingFound="Không tìm thấy"
						/>
					)}
				/>
			</SimpleGrid>
			{hasAddress && (
				<Group position="right" my="lg">
					<Button
						variant="outline"
						rightIcon={<X size={18} />}
						onClick={handleCancelUpdate}
					>
						Huỷ
					</Button>
					{isEditingAddress && (
						<Button
							onClick={handleUpdateAddress}
							rightIcon={<Plus size={18} />}
						>
							Sửa
						</Button>
					)}
					{isCreatingAddress && (
						<Button
							onClick={handleCreateAddress}
							rightIcon={<Plus size={18} />}
						>
							Tạo mới
						</Button>
					)}
				</Group>
			)}
		</Box>
	)
}
