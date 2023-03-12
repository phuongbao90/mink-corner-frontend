import { Status } from "@/types"

export type SortConditions =
	| "-date_created"
	| "date_created"
	| "-sortable_price"
	| "sortable_price"

export type FilterType = {
	status: {
		_eq: Status
	}
	category?: {
		category_slug: {
			_eq: string
		}
	} | null
	filterable_sizes?: {
		_contains: string
	} | null
	filterable_colors?: {
		_contains: string
	} | null
	sortable_price?:
		| null
		| { _gte: number }
		| { _lte: number }
		| { _between: string }
	_or?: [
		{ product_item: { SKU: { _in: string[] } } }?,
		{ category: { category_slug: { _in: string[] } } }?
	]
}

export type FetchOptionsType = {
	filter: FilterType
	sort: SortConditions
	limit: number
	page: number
}

export type CollectionSlice = {
	fetchOptions: FetchOptionsType

	actions: {
		updateFilterOptions: () => void
		updateCategoryFilter: (category_slug: string | null) => void
		updateSortOptions: (sortCondition: SortConditions) => void
		updatePageOptions: (nextPage: number) => void
		clearFilterOptions: () => void
	}
}
