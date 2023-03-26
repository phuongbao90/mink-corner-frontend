import { useCollectionStore } from "@/store/use-collection-store"
import { Box, Loader, TextInput, ThemeIcon, rem } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { useEffect } from "react"
import { Search } from "react-feather"

export const SearchInput = ({ isLoading }: { isLoading: boolean }) => {
	const [value, setValue] = useDebouncedState("", 800)
	const setSearchTerm = useCollectionStore((s) => s.actions.setSearchTerm)
	const fetchOptions = useCollectionStore((s) => s.fetchOptions)

	useEffect(() => {
		if (!value || value.length === 0) {
			setSearchTerm(null)
			return
		}
		setSearchTerm(value)
	}, [value])

	return (
		<TextInput
			defaultValue={value}
			onChange={(e) => setValue(e.currentTarget.value)}
			placeholder="Nhập từ khoá để tìm kiếm"
			styles={(theme) => ({
				input: {
					backgroundColor: "transparent",
					padding: 30,
					minWidth: rem(260),
					"&::placeholder": {
						color: theme.colors.brown?.[6],
					},
					borderColor: theme.colors.gray?.[5],
				},
				root: {},
				wrapper: {},
				rightSection: {
					paddingRight: 30,
				},
			})}
			rightSection={
				<ThemeIcon variant="light" size={20}>
					{isLoading ? <Loader /> : <Search />}
				</ThemeIcon>
			}
		/>
	)
}
