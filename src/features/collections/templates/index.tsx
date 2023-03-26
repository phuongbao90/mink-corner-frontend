import {
	CollectionList,
	FilterBox,
	SideBar,
	CollectionPagination,
	DrawerSelectSort,
	MobileFilterButtons,
} from "@/features/collections/components"

const DrawerSidebar = dynamic(() =>
	import("@/features/collections/components").then((comp) => comp.DrawerSidebar)
)

import { Box, Grid, Group, MediaQuery, Stack } from "@mantine/core"
import dynamic from "next/dynamic"

export const CollectionTemplate = () => {
	return (
		<>
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
		</>
	)
}
