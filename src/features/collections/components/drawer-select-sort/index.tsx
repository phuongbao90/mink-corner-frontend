import { SortConditions } from "@/features/collections/collections.types"
import { useCollectionStore } from "@/store/use-collection-store"
import {
	Affix,
	Box,
	Button,
	Group,
	MediaQuery,
	Overlay,
	Radio,
	Title,
	Transition,
} from "@mantine/core"

import { useState } from "react"

export const DrawerSelectSort = () => {
	const [selectedValue, setSelectedValue] =
		useState<SortConditions>("-date_created")

	const { updateSortOptions, toggleIsCollectionSelectOpened } =
		useCollectionStore((s) => s.actions)

	const isCollectionSelectOpened = useCollectionStore(
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
			<Box>
				{isCollectionSelectOpened && (
					<Overlay
						onClick={() => {
							toggleIsCollectionSelectOpened(false)
						}}
						blur={3}
					/>
				)}
				<Affix position={{ bottom: 0, right: 0, left: 0 }}>
					<Transition transition="slide-up" mounted={isCollectionSelectOpened}>
						{(transitionStyles) => (
							<Box
								style={transitionStyles}
								py="xs"
								sx={{
									backgroundColor: "#fff",
									boxShadow: `0px 0px 10px 0px rgba(0,0,0,0.1)`,
									border: "1px solid #eaeaea",
									borderTopLeftRadius: 8,
									borderTopRightRadius: 8,
									zIndex: 201,
								}}
							>
								<Title tt="capitalize" order={5} ml="lg" mb="md">
									sắp xếp sản phẩm theo
								</Title>
								<Box ml="xl">
									<Radio.Group
										value={selectedValue}
										onChange={(val: SortConditions) => setSelectedValue(val)}
										name="sort"
									>
										{data.map((el, index) => (
											<Radio
												key={index}
												value={el.value}
												label={el.label}
												mb="md"
											/>
										))}
									</Radio.Group>
								</Box>
								<Group position="right" mt="md">
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
							</Box>
						)}
					</Transition>
				</Affix>
			</Box>
		</MediaQuery>
	)
}
