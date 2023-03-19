import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { FetchOptionsType, SortConditions } from "@/features/collections"
import { immer } from "zustand/middleware/immer"
import { COLLECTION_PRODUCT_LIMIT } from "@/constant"
import { isNumber } from "lodash"
import { UserAddress } from "@/features/user"

export type CheckoutStoreType = {
	selectedAddress: UserAddress | null
	isEditingAddress: boolean
	isCreatingAddress: boolean
	// editedAddress: UserAddress | null
	actions: {
		selectAddress: (selectedAddress: UserAddress | null) => void
		setIsEditingAddress: (val: boolean) => void
		setIsCreatingAddress: (val: boolean) => void
		reset: () => void
		// setEditedAddress: (editedAddress: UserAddress) => void
	}
}

const initialState = {
	selectedAddress: null,
	isEditingAddress: false,
	isCreatingAddress: false,
}

export const useCheckoutStore = create<CheckoutStoreType>()(
	devtools(
		immer((set, get) => ({
			...initialState,
			// selectedAddress: null,
			// isEditingAddress: false,
			// isCreatingAddress: false,
			// editedAddress: null,
			actions: {
				selectAddress: (selectedAddress) => {
					set({
						selectedAddress,
					})
				},
				setIsEditingAddress: (isEditingAddress) => {
					if (isEditingAddress) {
						set({
							selectedAddress: null,
						})
					}

					set({
						isEditingAddress,
					})
				},
				setIsCreatingAddress: (isCreatingAddress) => {
					if (isCreatingAddress) {
						set({
							isEditingAddress: false,
							selectedAddress: null,
						})
					}

					set({
						isCreatingAddress,
					})
				},
				reset: () => {
					set(initialState)
				},
			},
		}))
	)
)
