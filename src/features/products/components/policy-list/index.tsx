import { IconImage } from "@/components"
import { useGetAppConfigs } from "@/features/app"
import { Box, Flex, Text } from "@mantine/core"
import { PhoneCall, Truck } from "react-feather"

const PolicyItem = ({
	title,
	subtitle,
	children,
}: {
	title: string
	subtitle?: string
	children?: React.ReactNode
}) => {
	return (
		<Box>
			<Flex direction={"row"} align="start">
				<Box
					sx={{
						position: "relative",
						width: 22,
						height: 22,
						marginRight: 15,
					}}
				>
					{children}
				</Box>
				<Box>
					<Text size="sm" fw={500} tt="lowercase">
						{title}
					</Text>
					{!!subtitle && (
						<Text size="xs" c="gray.7">
							{subtitle}
						</Text>
					)}
				</Box>
			</Flex>
		</Box>
	)
}

export const PolicyList = () => {
	const { data: appConfigs, isSuccess } = useGetAppConfigs()

	if (isSuccess) {
		const {
			product_detail_policies,
			is_freeship_program_on,
			owner_phone_number,
		} = appConfigs

		return (
			<Box mt={24}>
				{!!is_freeship_program_on && (
					<Box my={16}>
						<PolicyItem title="FREESHIP cho đơn hàng từ 150K">
							<Truck size={18} />
						</PolicyItem>
					</Box>
				)}
				{!!owner_phone_number && (
					<Box my={16}>
						<PolicyItem title={`Hotline bán hàng: ${owner_phone_number}`}>
							<PhoneCall size={18} />
						</PolicyItem>
					</Box>
				)}

				{product_detail_policies &&
					product_detail_policies.map((policy) => (
						<Box key={policy.order} mt={8}>
							<Flex direction={"row"} align="start">
								<Box
									sx={{
										position: "relative",
										width: 22,
										height: 22,
										marginRight: 15,
										marginTop: 4,
									}}
								>
									<IconImage
										src={policy.icon_id}
										alt="icon"
										width={18}
										height={18}
									/>
								</Box>
								<Box>
									<Text size="sm" fw={500} tt="lowercase">
										{policy.title}
									</Text>
									<Text size="xs" c="gray.7">
										{policy.subtitle}
									</Text>
								</Box>
							</Flex>
						</Box>
					))}
			</Box>
		)
	}

	return null
}
