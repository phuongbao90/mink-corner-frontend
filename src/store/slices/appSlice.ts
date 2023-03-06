// import { COLLECTION_PRODUCT_LIMIT } from "@/constant"
// import {
// 	CollectionSlice,
// 	FetchOptionsType,
// 	SortConditions,
// } from "@/features/collections"
// import { StateCreator } from "zustand"

// export type AppSlice = {
// 	/* ------------------------------- APP STATES ------------------------------- */
// 	isOverlayLoaderVisible: boolean
// 	isSidebarCartVisible: boolean
// 	/* ---------------------------- COLLECTION STATES --------------------------- */
// 	fetchOptions: FetchOptionsType
// 	actions: {
// 		/* ------------------------------- APP STATES ------------------------------- */
// 		toggleIsOverlayLoaderVisible: (assignedValue?: boolean) => void
// 		toggleIsSidebarCartVisible: (assignedValue?: boolean) => void
// 		/* ---------------------------- COLLECTION STATES --------------------------- */
// 		updateFilterOptions: () => void
// 		updateCategoryFilter: (category_slug: string | null) => void
// 		updateSortOptions: (sortCondition: SortConditions) => void
// 		updatePageOptions: (nextPage: number) => void
// 		clearFilterOptions: () => void
// 	}
// }

// export const createAppSlice: StateCreator<
// 	AppSlice,
// 	[["zustand/devtools", never], ["zustand/immer", never]],
// 	[],
// 	AppSlice
// > = (set, get) => ({
// 	isOverlayLoaderVisible: false,
// 	isSidebarCartVisible: false,
// 	/* -------------------------------------------------------------------------- */
// 	fetchOptions: {
// 		filter: {
// 			category_slug: null,
// 		},
// 		sort: "-date_created",
// 		limit: COLLECTION_PRODUCT_LIMIT,
// 		page: 1,
// 	},
// 	//
// 	actions: {
// 		toggleIsOverlayLoaderVisible: async (assignedValue) => {
// 			if (typeof assignedValue === "boolean") {
// 				set({ isOverlayLoaderVisible: assignedValue })
// 			} else {
// 				set((state) => ({
// 					isOverlayLoaderVisible: !state.isOverlayLoaderVisible,
// 				}))
// 			}
// 		},
// 		toggleIsSidebarCartVisible: (assignedValue) => {
// 			if (typeof assignedValue === "boolean") {
// 				set({ isSidebarCartVisible: assignedValue })
// 			} else {
// 				set((state) => ({
// 					isSidebarCartVisible: !state.isSidebarCartVisible,
// 				}))
// 			}
// 		},
// 		/* -------------------------------------------------------------------------- */
// 		updateFilterOptions: () => {},
// 		updateCategoryFilter: (category_slug) => {
// 			const currentCategory = get().fetchOptions.filter.category_slug
// 			if (currentCategory === category_slug) {
// 				set((state) => {
// 					state.fetchOptions.filter.category_slug = null
// 					state.fetchOptions.page = 1
// 					return state
// 				})
// 				return
// 			}

// 			set((state) => {
// 				state.fetchOptions.filter.category_slug = category_slug
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
