import { useCollectionStore } from "@/store/use-collection-store"
import { Flex, Select, Text } from "@mantine/core"

export const FilterBox = () => {
	const updateSortOptions = useCollectionStore(
		(state) => state.actions.updateSortOptions
	)
	const fetchOptions = useCollectionStore((s) => s.fetchOptions)

	return (
		<Flex align="baseline">
			<Text mr="md" fw={600}>
				Xắp xếp theo
			</Text>
			<Select
				data={[
					{ value: "-date_created", label: "Mới nhất" },
					{ value: "date_created", label: "Cũ nhất" },
					{ value: "sortable_price", label: "Giá: tăng dần" },
					{ value: "-sortable_price", label: "Giá: giảm dần" },
				]}
				value={fetchOptions.sort}
				onChange={updateSortOptions}
			/>
		</Flex>
	)
}
