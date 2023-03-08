import { SideBar } from "@/features/collections/components/SideBar"
import { useBoundStore } from "@/store/useStore"
import { createStyles, Drawer, Title } from "@mantine/core"

const useStyles = createStyles((theme) => ({
	root: {},
	header: {
		borderBottomWidth: 2,
		borderColor: "black",
		padding: "16px 16px",
	},
	closeButton: {},
	title: {
		marginTop: 4,
	},
	body: {
		height: "100%",
	},
}))

export const DrawerSidebar = () => {
	const isCollectionSidebarOpened = useBoundStore(
		(s) => s.isCollectionSidebarOpened
	)
	const { classes } = useStyles()
	const toggleIsCollectionSidebarOpen = useBoundStore(
		(s) => s.actions.toggleIsCollectionSidebarOpen
	)

	return (
		<Drawer
			opened={isCollectionSidebarOpened}
			classNames={{ ...classes }}
			onClose={() => toggleIsCollectionSidebarOpen(false)}
			position="left"
			overlayProps={{
				opacity: 0.55,
				blur: 2,
			}}
			size={"85%"}
			title={<Title order={3}>Bộ lọc</Title>}
		>
			<SideBar />
		</Drawer>
	)
}
