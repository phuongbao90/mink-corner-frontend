import { SortConditions } from "@/features/collections/collections.types"
import { useBoundStore } from "@/store/useStore"
import {
	Box,
	Button,
	Drawer,
	Group,
	MediaQuery,
	Radio,
	Title,
} from "@mantine/core"
import { useState } from "react"

export const DrawerSelectSort = () => {
	const [selectedValue, setSelectedValue] =
		useState<SortConditions>("-date_created")
	const updateSortOptions = useBoundStore((s) => s.actions.updateSortOptions)
	const toggleIsCollectionSelectOpened = useBoundStore(
		(s) => s.actions.toggleIsCollectionSelectOpened
	)
	const isCollectionSelectOpened = useBoundStore(
		(s) => s.isCollectionSelectOpened
	)

	const data = [
		{ value: "-date_created", label: "Mới nhất" },
		{ value: "date_created", label: "Cũ nhất" },
		{ value: "sortable_price", label: "Giá: tăng dần" },
		{ value: "-sortable_price", label: "Giá: giảm dần" },
	] as const

	return (
		<MediaQuery
			largerThan="md"
			styles={{
				display: "none",
			}}
		>
			<Drawer
				opened={isCollectionSelectOpened}
				onClose={toggleIsCollectionSelectOpened}
				position="bottom"
				size="40%"
				styles={{
					body: {
						height: "100%",
					},
					header: {
						padding: "16px 20px",
					},
				}}
				title={
					<Title order={3} size="h4">
						Xắp xếp theo
					</Title>
				}
			>
				<Box ml="xl">
					<Radio.Group
						value={selectedValue}
						onChange={(val: SortConditions) => setSelectedValue(val)}
						name="sort"
					>
						{data.map((el, index) => (
							<Radio key={index} value={el.value} label={el.label} mb="lg" />
						))}
					</Radio.Group>
				</Box>
				<Group position="right" mt="xl">
					<Button
						onClick={() => {
							toggleIsCollectionSelectOpened(false)
							updateSortOptions(selectedValue)
						}}
						variant="subtle"
					>
						Áp dụng
					</Button>
				</Group>
			</Drawer>
		</MediaQuery>
	)
}
