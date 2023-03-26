import { SearchTemplate } from "@/features/search/template"
import { useCollectionStore } from "@/store/use-collection-store"
import { useEffect } from "react"

const SearchPage = () => {
	const resetStore = useCollectionStore((s) => s.actions.reset)

	useEffect(() => {
		return () => {
			resetStore()
		}
	}, [resetStore])

	return <SearchTemplate />
}

export default SearchPage
