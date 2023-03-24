import {
	CollectionList,
	FilterBox,
	SideBar,
	CollectionPagination,
} from "@/features/collections/components"

const DrawerSelectSort = dynamic(() =>
	import("@/features/collections/components").then(
		(comp) => comp.DrawerSelectSort
	)
)
const DrawerSidebar = dynamic(() =>
	import("@/features/collections/components").then((comp) => comp.DrawerSidebar)
)
const MobileFilterButtons = dynamic(() =>
	import("@/features/collections/components").then(
		(comp) => comp.MobileFilterButtons
	)
)

import {
	Box,
	Container,
	Grid,
	Group,
	MediaQuery,
	Stack,
	Title,
} from "@mantine/core"
import dynamic from "next/dynamic"

export const CollectionTemplate = () => {
	return (
		<Container size="xl">
			<Title
				my="xl"
				order={1}
				size="h2"
				sx={(theme) => ({
					[theme.fn.smallerThan("xs")]: {
						fontSize: 20,
					},
					[theme.fn.largerThan("xs")]: {
						fontSize: 28,
					},
				})}
				tt="capitalize"
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
						<Grid.Col span={24} md={6}>
							<SideBar />
						</Grid.Col>
					</MediaQuery>

					<Grid.Col span={24} md={18}>
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
							<Group position="right" my={{ base: 16, sm: 36 }}>
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
