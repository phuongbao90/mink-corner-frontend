import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { FetchOptionsType, SortConditions } from "@/features/collections"
import { immer } from "zustand/middleware/immer"
import { COLLECTION_PRODUCT_LIMIT } from "@/constant"
import { isNumber } from "lodash"

export type AppSlice = {
	/* ------------------------------- APP STATES ------------------------------- */
	isNavbarOpened: boolean
	isOverlayLoaderVisible: boolean
	isSidebarCartVisible: boolean
	isMobileNotificationOpened: boolean
	mobileNotificationData: {
		type: "success" | "info" | "warning" | "error"
		title: string
		message?: string
	}
	/* ---------------------------- COLLECTION STATES --------------------------- */
	fetchOptions: FetchOptionsType
	isCollectionSidebarOpened: boolean
	isCollectionSelectOpened: boolean
	actions: {
		/* ------------------------------- APP STATES ------------------------------- */
		toggleIsOverlayLoaderVisible: (assignedValue?: boolean) => void
		toggleIsSidebarCartVisible: (assignedValue?: boolean) => void
		toggleIsNavbarOpened: (assignedValue?: boolean) => void
		toggleIsMobileNotificationOpened: (assignedValue?: boolean) => void
		showMobileNotification: (data: AppSlice["mobileNotificationData"]) => void

		/* ---------------------------- COLLECTION STATES --------------------------- */
		updateFilterOptions: () => void
		updateCategoryFilter: (category_slug: string | null) => void
		setCategoryFilter: (category_slug: string | null) => void
		updateSortOptions: (sortCondition: SortConditions) => void
		updatePageOptions: (nextPage: number) => void
		clearFilterOptions: () => void
		uppdateColorFilter: (color_id: string) => void
		updatePriceFilter: (min: number, max: number) => void
		clearPriceFilter: () => void
		toggleIsCollectionSidebarOpen: (assignedValue?: boolean) => void
		toggleIsCollectionSelectOpened: (assignedValue?: boolean) => void
	}
}

const DEFAULT_FILTERS = {
	category: null,
	filterable_colors: null,
	filterable_sizes: null,
	sortable_price: null,
	status: { _eq: "published" },
} as const

export const useBoundStore = create<AppSlice>()(
	devtools(
		immer((set, get) => ({
			isOverlayLoaderVisible: false,
			isSidebarCartVisible: false,
			isNavbarOpened: false,
			isMobileNotificationOpened: false,
			mobileNotificationData: {
				type: "info",
				title: "",
			},
			/* -------------------------------------------------------------------------- */
			isCollectionSidebarOpened: false,
			isCollectionSelectOpened: false,
			fetchOptions: {
				filter: DEFAULT_FILTERS,
				sort: "-date_created",
				limit: COLLECTION_PRODUCT_LIMIT,
				page: 1,
			},

			actions: {
				toggleIsNavbarOpened: (assignedValue) => {
					set((state) => ({
						isNavbarOpened:
							typeof assignedValue === "boolean"
								? assignedValue
								: !state.isNavbarOpened,
					}))
				},
				toggleIsOverlayLoaderVisible: async (assignedValue) => {
					if (typeof assignedValue === "boolean") {
						set({ isOverlayLoaderVisible: assignedValue })
					} else {
						set((state) => ({
							isOverlayLoaderVisible: !state.isOverlayLoaderVisible,
						}))
					}
				},
				toggleIsSidebarCartVisible: (assignedValue) => {
					if (typeof assignedValue === "boolean") {
						set({ isSidebarCartVisible: assignedValue })
					} else {
						set((state) => ({
							isSidebarCartVisible: !state.isSidebarCartVisible,
						}))
					}
				},
				toggleIsMobileNotificationOpened: (assignedValue) => {
					if (typeof assignedValue === "boolean") {
						set({ isMobileNotificationOpened: assignedValue })
					} else {
						set((state) => ({
							isMobileNotificationOpened: !state.isMobileNotificationOpened,
						}))
					}
				},
				showMobileNotification: (mobileNotificationData) => {
					set({ mobileNotificationData, isMobileNotificationOpened: true })
				},
				/* -------------------------------------------------------------------------- */
				updateFilterOptions: () => {},
				updateCategoryFilter: (category_slug) => {
					if (!category_slug || typeof category_slug !== "string") return
					const currentCategory =
						get().fetchOptions.filter.category?.category_slug?._eq

					set((state) => {
						state.fetchOptions.page = 1
						state.fetchOptions.filter.category =
							currentCategory === category_slug
								? null
								: {
										category_slug: { _eq: category_slug },
								  }
					})
				},
				setCategoryFilter: (category_slug) => {
					if (!category_slug || typeof category_slug !== "string") {
						set((state) => {
							state.fetchOptions.filter = {
								...DEFAULT_FILTERS,
								category: null,
							}
						})
						return
					}

					set((state) => {
						state.fetchOptions.page = 1
						state.fetchOptions.sort = "-date_created"
						state.fetchOptions.filter = {
							...DEFAULT_FILTERS,
							category: {
								category_slug: { _eq: category_slug },
							},
						}
					})
				},
				updateSortOptions: (sortCondition) => {
					set((state) => {
						state.fetchOptions.sort = sortCondition
						state.fetchOptions.page = 1
						return state
					})
				},
				updatePageOptions: (nextPage) =>
					set((state) => {
						state.fetchOptions.page = nextPage
						return state
					}),
				clearFilterOptions: () => {},
				uppdateColorFilter: (color_id) => {
					if (!color_id || typeof color_id !== "string") return

					const currentColorId =
						get().fetchOptions.filter.filterable_colors?._contains

					set((state) => {
						state.fetchOptions.page = 1
						state.fetchOptions.filter.filterable_colors =
							currentColorId === color_id
								? null
								: {
										_contains: color_id,
								  }
					})
				},
				updatePriceFilter: (min, max) => {
					if (isNumber(min) && min > max) {
						set((state) => {
							state.fetchOptions.filter.sortable_price = { _gte: min }
							state.fetchOptions.page = 1
						})
						return
					}
					if (isNumber(max) && max > min) {
						set((state) => {
							state.fetchOptions.filter.sortable_price = { _gte: min }
							state.fetchOptions.page = 1
						})
						return
					}
					if (isNumber(min) && isNumber(max)) {
						set((state) => {
							state.fetchOptions.filter.sortable_price = {
								_between: `${min},${max}`,
							}
							state.fetchOptions.page = 1
						})
					}
				},
				clearPriceFilter: () => {
					set((state) => {
						state.fetchOptions.page = 1
						state.fetchOptions.filter.sortable_price = null
					})
				},
				toggleIsCollectionSidebarOpen: (assignedValue) => {
					set((state) => ({
						isCollectionSidebarOpened:
							typeof assignedValue === "boolean"
								? assignedValue
								: !state.isCollectionSidebarOpened,
					}))
				},
				toggleIsCollectionSelectOpened: (assignedValue) => {
					set((state) => ({
						isCollectionSelectOpened:
							typeof assignedValue === "boolean"
								? assignedValue
								: !state.isCollectionSelectOpened,
					}))
				},
			},
		}))
	)
)
