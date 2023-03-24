import { useGetAppConfigs } from "@/features/app"
import { formatCurrency } from "@/utils"
import { Box, Collapse, Container, Group, Title } from "@mantine/core"
import { useWindowScroll } from "@mantine/hooks"

export const AnnouncementBar = () => {
	const [scroll] = useWindowScroll()
	const { data: appConfigs, isSuccess } = useGetAppConfigs()

	return (
		<>
			{isSuccess &&
				appConfigs.is_freeship_program_on &&
				appConfigs.freeship_target && (
					<Collapse in={scroll.y === 0} transitionDuration={200}>
						<Box sx={{}} bg="brown.6">
							<Container size="xl">
								<Group position="apart">
									<div />
									<Box>
										<Title
											order={6}
											py="xs"
											color="#fff"
											sx={(theme) => ({
												[theme.fn.smallerThan("xs")]: {
													fontSize: 12,
												},
												[theme.fn.largerThan("xs")]: {
													fontSize: 16,
												},
											})}
										>
											Miễn phí tiền ship cho đơn hàng từ{" "}
											{formatCurrency(Number(appConfigs.freeship_target))}
										</Title>
									</Box>
									<div />
								</Group>
							</Container>
						</Box>
					</Collapse>
				)}
		</>
	)
}
