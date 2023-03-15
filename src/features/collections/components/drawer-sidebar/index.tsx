import { SideBar } from "@/features/collections/components/SideBar"
import { useCollectionStore } from "@/store/use-collection-store"
import { createStyles, Drawer, Title } from "@mantine/core"

const useStyles = createStyles((theme) => ({
	root: {},
	header: {
		borderBottomWidth: 2,
		borderColor: "black",
		padding: "16px 16px",
		zIndex: 9,
		borderBottom: 1,
		borderBottomColor: "#eaeaea",
		borderBottomStyle: "solid",
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
	const { classes } = useStyles()
	const isCollectionSidebarOpened = useCollectionStore(
		(s) => s.isCollectionSidebarOpened
	)
	const toggleIsCollectionSidebarOpen = useCollectionStore(
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
