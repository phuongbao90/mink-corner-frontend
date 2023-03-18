import { Select } from "@mantine/core"
import { FormValues } from "@/features/checkout/templates"
import { useFormContext, Controller } from "react-hook-form"
import { useGetCities, useGetDistricts, useGetWards } from "@/features/checkout"
import { Box, SimpleGrid, Text, TextInput } from "@mantine/core"
import { useCheckoutStore } from "@/store/use-checkout-store"

export const UserAddressForm = () => {
	const { setCityName, setDistrictName, setWardName } = useCheckoutStore(
		(s) => s.actions
	)
	/* -------------------------------------------------------------------------- */
	const {
		register,
		formState: { errors },
		control,
		setValue,
		watch,
	} = useFormContext<FormValues>()
	const city = watch("city")
	const district = watch("district")

	/* -------------------------------------------------------------------------- */
	const { data: cities } = useGetCities()
	const cityOptions = cities?.map((city) => ({
		value: city.id,
		label: city.ten_tinh_thanh,
	}))
	const { data: districts, isFetching: isFetchingDistricts } =
		useGetDistricts(city)
	const districtOptions = districts?.map((district) => ({
		value: district.id,
		label: district.ten_quan_huyen,
	}))
	const { data: wards, isFetching: isFetchingWards } = useGetWards(district)
	const wardOptions = wards?.map((ward) => ({
		value: ward.id,
		label: ward.ten_xa_phuong,
	}))
	/* -------------------------------------------------------------------------- */

	return (
		<Box>
			<TextInput
				mb="xs"
				withAsterisk
				label="Địa chỉ"
				autoComplete="off"
				error={errors.address?.message}
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
				<div>
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
								onChange={(val) => {
									const found = cityOptions?.find((el) => el.value === val)
									if (found) setCityName(found.label)

									onChange(val)
									setValue("district", "")
									setValue("ward", "")
									setValue("shipping_method", -1)
								}}
								placeholder="Chọn tỉnh / thành"
								value={value}
								error={
									errors.city?.message ? <Text>Chưa chọn Thành phố</Text> : null
								}
								searchable
								maxDropdownHeight={400}
								nothingFound="Không tìm thấy"
							/>
						)}
					/>
				</div>
				<div>
					<Controller
						control={control}
						name="district"
						render={({ field: { onChange, value, name, ref } }) => (
							<Select
								ref={ref}
								value={value}
								name={name}
								label="Quận huyện"
								withAsterisk
								placeholder={"Chọn quận / huyện"}
								onChange={(val) => {
									const found = districtOptions?.find((el) => el.value === val)
									if (found) setDistrictName(found.label)
									setValue("ward", "")
									onChange(val)
								}}
								data={districtOptions || []}
								disabled={!city || isFetchingDistricts}
								searchable
								maxDropdownHeight={400}
								nothingFound="Không tìm thấy"
								error={
									errors.district?.message ? (
										<Text>Chưa chọn quận / huyện</Text>
									) : null
								}
							/>
						)}
					/>
				</div>
				<div>
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
								onChange={(val) => {
									const found = wardOptions?.find((el) => el.value === val)
									if (found) setWardName(found.label)
									onChange(val)
								}}
								data={wardOptions || []}
								disabled={!district || isFetchingWards}
								error={
									errors.ward?.message ? (
										<Text>Chưa chọn Phường / Xã</Text>
									) : null
								}
								searchable
								maxDropdownHeight={400}
								nothingFound="Không tìm thấy"
							/>
						)}
					/>
				</div>
			</SimpleGrid>
		</Box>
	)
}
