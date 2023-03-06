import Select from "react-select"
import { FormValues } from "@/features/checkout/templates"
import { useFormContext, Controller } from "react-hook-form"
import { useGetCities, useGetDistricts, useGetWards } from "@/features/checkout"
import { Box, SimpleGrid, Text, TextInput, Title } from "@mantine/core"

export const CheckoutForm = () => {
	const {
		register,
		formState: { errors },
		control,
		setValue,
		watch,
	} = useFormContext<FormValues>()

	const city = watch("city")
	const district = watch("district")

	const { data: cities } = useGetCities()
	const cityOptions = cities?.map((city) => ({
		value: city.id,
		label: city.ten_tinh_thanh,
	}))

	const { data: districts, isFetching: isFetchingDistricts } = useGetDistricts(
		city?.value
	)
	const districtOptions = districts?.map((district) => ({
		value: district.id,
		label: district.ten_quan_huyen,
	}))
	const { data: wards, isFetching: isFetchingWards } = useGetWards(
		district?.value
	)
	const wardOptions = wards?.map((ward) => ({
		value: ward.id,
		label: ward.ten_xa_phuong,
	}))

	return (
		<div>
			<Title order={1} size="h3" mb="sm">
				Thông tin liên hệ
			</Title>

			<Box>
				<TextInput
					withAsterisk
					label="Họ tên"
					autoComplete="off"
					error={errors.name?.message}
					{...register("name", { required: true })}
					mb="xs"
				/>
				<SimpleGrid cols={2} mb="xs">
					<TextInput
						label="Email"
						autoComplete="off"
						error={errors.email_address?.message}
						{...register("email_address", { required: true })}
					/>
					<TextInput
						withAsterisk
						label="Số điện thoại"
						autoComplete="off"
						error={errors.phone_number?.message}
						{...register("phone_number", { required: true })}
					/>
				</SimpleGrid>

				<TextInput
					withAsterisk
					label="Địa chỉ"
					autoComplete="off"
					error={errors.address?.message}
					{...register("address", { required: true })}
					mb="xs"
				/>
			</Box>

			<SimpleGrid
				mb="xs"
				breakpoints={[
					{ minWidth: "sm", cols: 1 },
					{ minWidth: "md", cols: 3 },
				]}
			>
				<div>
					<label
						htmlFor="city-select"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Thành phố{" "}
						<Text span c="red.6">
							*
						</Text>
					</label>

					<Controller
						control={control}
						name="city"
						render={({ field: { onChange, value, name, ref } }) => (
							<>
								<Select
									ref={ref}
									name={name}
									inputId="city-select"
									instanceId={name}
									// placeholder="Chọn tỉnh / thành"
									placeholder={
										<Text fz="xs" lineClamp={1}>
											Chọn tỉnh / thành
										</Text>
									}
									onChange={onChange}
									value={value}
									onInputChange={() => {
										setValue("district", null)
										setValue("ward", null)
										setValue("shipping_method", null)
									}}
									options={cityOptions || []}
									// isLoading={isFetchingCities}
								/>
								<Text c="red.6" size="xs">
									{!!errors.city?.message && "Chưa chọn Thành phố"}
								</Text>
							</>
						)}
					/>
				</div>
				<div>
					<label
						htmlFor="district-select"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Quận huyện{" "}
						<Text span c="red.6">
							*
						</Text>
					</label>
					<Controller
						control={control}
						name="district"
						render={({ field: { onChange, value, name, ref } }) => (
							<>
								<Select
									ref={ref}
									value={value}
									name={name}
									inputId="district-select"
									instanceId={name}
									// placeholder="Chọn quận / huyện"
									placeholder={
										<Text fz="xs" lineClamp={1}>
											Chọn quận / huyện
										</Text>
									}
									onChange={onChange}
									onInputChange={() => {
										setValue("ward", null)
										// setValue("shipping_method", null)
									}}
									options={districtOptions || []}
									isDisabled={!city || isFetchingDistricts}
									// isLoading={isFetchingDistricts}
								/>
								<Text c="red.6" size="xs">
									{!!errors.district?.message && "Chưa chọn Quận / Huyện"}
								</Text>
							</>
						)}
					/>
				</div>
				<div>
					<label
						htmlFor="ward-select"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Phường xã{" "}
						<Text span c="red.6">
							*
						</Text>
					</label>
					<Controller
						control={control}
						name="ward"
						render={({ field: { onChange, value, name, ref } }) => (
							<>
								<Select
									ref={ref}
									name="name"
									inputId="ward-select"
									instanceId={name}
									placeholder={
										<Text fz="xs" lineClamp={1}>
											Chọn phường / xã
										</Text>
									}
									value={value}
									onChange={onChange}
									options={wardOptions || []}
									isDisabled={!district || isFetchingWards}
									// isLoading={isFetchingWards}
								/>
								<Text c="red.6" size="xs">
									{!!errors.ward?.message && "Chưa chọn Phường / Xã"}
								</Text>
							</>
						)}
					/>
				</div>
			</SimpleGrid>
		</div>
	)
}
