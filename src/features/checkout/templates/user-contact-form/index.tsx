import { FormValues } from "@/features/checkout/templates"
import { useFormContext } from "react-hook-form"
import { Box, SimpleGrid, TextInput, Title } from "@mantine/core"

export const UserContactForm = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormValues>()

	return (
		<div>
			<Title order={4} mb="sm">
				Liên hệ
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
						{...register("email_address", { required: false })}
					/>
					<TextInput
						withAsterisk
						label="Số điện thoại"
						autoComplete="off"
						error={errors.phone_number?.message}
						{...register("phone_number", { required: true })}
					/>
				</SimpleGrid>
			</Box>
		</div>
	)
}
