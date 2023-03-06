import { useBoundStore } from "@/store/useStore"
import { Group, MediaQuery, Text, UnstyledButton } from "@mantine/core"
import { ChevronDown, Filter } from "react-feather"

export const MobileFilterButtons = () => {
	const toggleIsCollectionSidebarOpen = useBoundStore(
		(s) => s.actions.toggleIsCollectionSidebarOpen
	)
	const toggleIsCollectionSelectOpened = useBoundStore(
		(s) => s.actions.toggleIsCollectionSelectOpened
	)

	return (
		<MediaQuery
			largerThan="md"
			styles={{
				display: "none",
			}}
		>
			<Group position="apart">
				<UnstyledButton
					sx={{ display: "flex", alignItems: "center" }}
					onClick={() => toggleIsCollectionSidebarOpen(true)}
				>
					<Filter size={16} />
					<Text ml={6}>Lọc</Text>
				</UnstyledButton>

				<UnstyledButton
					sx={{ display: "flex", alignItems: "center" }}
					onClick={() => toggleIsCollectionSelectOpened(true)}
				>
					<Text mr={6}>Xắp xếp</Text>
					<ChevronDown size={16} />
				</UnstyledButton>
			</Group>
		</MediaQuery>
	)
}
