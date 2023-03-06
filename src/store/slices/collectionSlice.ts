// import { StateCreator } from "zustand"
// import { CollectionSlice } from "@/features/collections"
// import { COLLECTION_PRODUCT_LIMIT } from "@/constant"
// import { AppSlice } from "@/store/slices/appSlice"

// export const createCollectionSlice: StateCreator<
// 	CollectionSlice & AppSlice,
// 	[["zustand/devtools", never], ["zustand/immer", never]],
// 	[],
// 	CollectionSlice
// > = (set, get) => ({
// 	fetchOptions: {
// 		filter: {
// 			category: {
// 				category_slug: {
// 					_eq: "nhan",
// 				},
// 			},
// 			filterable_colors: {
// 				_contains: "1",
// 			},
// 			filterable_sizes: {
// 				_contains: "1",
// 			},
// 			// filterable_colors: null,
// 			// filterable_sizes: null,
// 		},
// 		sort: "-date_created",
// 		limit: COLLECTION_PRODUCT_LIMIT,
// 		page: 1,
// 	},
// 	actions: {
// 		updateFilterOptions: () => {},
// 		updateCategoryFilter: (category_slug) => {
// 			const currentCategory =
// 				get().fetchOptions.filter?.category?.category_slug?._eq
// 			if (currentCategory === category_slug) {
// 				set((state) => {
// 					state.fetchOptions.filter.category = null
// 					state.fetchOptions.page = 1
// 					return state
// 				})
// 				return
// 			}

// 			set((state) => {
// 				state.fetchOptions.filter.category?.category_slug._eq = category_slug
// 				state.fetchOptions.page = 1
// 				return state
// 			})
// 		},
// 		updateSortOptions: (sortCondition) => {
// 			set((state) => {
// 				state.fetchOptions.sort = sortCondition
// 				state.fetchOptions.page = 1
// 				return state
// 			})
// 		},
// 		updatePageOptions: (nextPage) =>
// 			set((state) => {
// 				state.fetchOptions.page = nextPage
// 				return state
// 			}),
// 		clearFilterOptions: () => {},
// 	},
// })
