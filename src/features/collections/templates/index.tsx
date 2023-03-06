import {
	CollectionList,
	DrawerSelectSort,
	FilterBox,
	SideBar,
	DrawerSidebar,
	MobileFilterButtons,
	CollectionPagination,
} from "@/features/collections/components"

import {
	Box,
	Container,
	Grid,
	Group,
	MediaQuery,
	Stack,
	Title,
} from "@mantine/core"

export const CollectionTemplate = () => {
	return (
		<Container size="xl">
			<Title
				my="xl"
				order={2}
				sx={(theme) => ({
					[theme.fn.smallerThan("xs")]: {
						fontSize: 20,
					},
					[theme.fn.largerThan("xs")]: {
						fontSize: 28,
					},
				})}
			>
				bộ sưu tập của mink&#39;s corner
			</Title>
			<Box>
				<Grid columns={24} gutter="xl">
					<MediaQuery
						smallerThan="md"
						styles={{
							display: "none",
						}}
					>
						<Grid.Col span={24} md={5}>
							<SideBar />
						</Grid.Col>
					</MediaQuery>

					<Grid.Col span={24} md={19}>
						<MediaQuery
							smallerThan="md"
							styles={{
								display: "none",
							}}
						>
							<Group position="left" mb="xl" mt="md" ml="md">
								<FilterBox />
							</Group>
						</MediaQuery>

						<Stack justify="space-between" h="95%">
							<MobileFilterButtons />

							<CollectionList />
							<Group position="right">
								<CollectionPagination />
							</Group>
						</Stack>
					</Grid.Col>
				</Grid>
			</Box>

			<DrawerSidebar />
			<DrawerSelectSort />
		</Container>
	)
}
