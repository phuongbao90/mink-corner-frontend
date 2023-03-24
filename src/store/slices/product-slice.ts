import isEmpty from "lodash/isEmpty"
import { ProductSlice } from "@/features/products"
import { StateCreator } from "zustand"

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
	product: undefined,
	selected_product_item: undefined,
	quantity: 1,
	maxQuantityMet: false,
	inStock: false,
	disabled: true,
	//
	variantRecord: new Map(),
	selectedOptions: new Map(),
	//
	actions: {
		setProduct: async (product) => {
			const { product_item } = product || {}
			const setVariantRecord = get().actions.setVariantRecord
			const initSelectedOptions = get().actions.initSelectedOptions

			set({ product })

			if (product_item && product_item.length > 0) {
				setVariantRecord(product_item)
				initSelectedOptions(product_item)
			}
		},
		select_product_item: (item) =>
			set({
				selected_product_item: item,
			}),

		decreaseQuantity: () =>
			set((state) => {
				const { quantity, maxQuantityMet } = state
				if (quantity > 1) {
					state.quantity = quantity - 1
					if (maxQuantityMet) {
						state.maxQuantityMet = false
					}
				}
				return state
			}),
		increaseQuantity: () =>
			set((state) => {
				const { quantity, selected_product_item } = state
				const maxQuantity = selected_product_item?.quantity || 0
				if (maxQuantity > quantity + 1) {
					state.quantity = quantity + 1
				} else {
					state.maxQuantityMet = true
				}
				return state
			}),

		updateQuantity: (nextQuantity) => {
			const currentQuantity = get().quantity
			const selected_product_item = get().selected_product_item
			const maxQuantity = selected_product_item?.quantity || 0
			const isIncreased = nextQuantity > currentQuantity

			if (isIncreased) {
				set((state) => {
					if (maxQuantity > currentQuantity) {
						state.quantity = currentQuantity + 1
					} else {
						state.maxQuantityMet = true
					}

					return state
				})
			}

			if (!isIncreased) {
				set((state) => {
					if (state.quantity > 1) {
						state.quantity = state.quantity - 1
						if (state.maxQuantityMet) state.maxQuantityMet = false
					}

					return state
				})
			}
		},

		setVariantRecord: (product_items) => {
			for (const product_item of product_items) {
				const product_item_id = product_item.id
				const variants = new Map<"size" | "color", string>()

				if (product_item.size) {
					variants.set("size", product_item.size.id)
				}
				if (product_item.color) {
					variants.set("color", product_item.color.id)
				}
				set((state) => {
					state.variantRecord.set(product_item_id, variants)
					return state
				})
			}
		},

		initSelectedOptions: async (product_item) => {
			let sortedLowestPrice = [...product_item]?.sort(
				(a, b) => +a.price - +b.price
			)
			const lowestPrice = sortedLowestPrice[0]
			const selectedOptionObj: Record<string, string> = {}
			if (!isEmpty(lowestPrice.color)) {
				selectedOptionObj["color"] = lowestPrice.color.id
			}
			if (!isEmpty(lowestPrice.size)) {
				selectedOptionObj["size"] = lowestPrice.size.id
			}

			set({
				selectedOptions: new Map(Object.entries(selectedOptionObj)),
			})
		},

		updateSelectedOptions: (optionTitle, optionId) => {
			if (!optionTitle || !optionId) return
			const currentOptionId = get().selectedOptions?.get(optionTitle)

			if (currentOptionId === optionId) {
				set((state) => {
					state.selectedOptions?.delete(optionTitle)
					return state
				})
			} else {
				set((state) => {
					state.selectedOptions?.set(optionTitle, optionId)
					return state
				})
			}
		},
	},
})
