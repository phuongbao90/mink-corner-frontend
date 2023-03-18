import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { FetchOptionsType, SortConditions } from "@/features/collections"
import { immer } from "zustand/middleware/immer"
import { COLLECTION_PRODUCT_LIMIT } from "@/constant"
import { isNumber } from "lodash"
import { UserAddress } from "@/features/user"

export type CheckoutStoreType = {
	cityName: string
	districtName: string
	wardName: string
	selectedAddressId: string
	isEditingAddress: boolean
	editedAddress: UserAddress | null
	actions: {
		setCityName: (cityName: string) => void
		setDistrictName: (districtName: string) => void
		setWardName: (wardName: string) => void
		selectAddressId: (selectedAddressId: string) => void
		setIsEditingAddress: (val: boolean) => void
		setEditedAddress: (editedAddress: UserAddress) => void
	}
}

export const useCheckoutStore = create<CheckoutStoreType>()(
	devtools(
		immer((set, get) => ({
			cityName: "",
			districtName: "",
			wardName: "",
			selectedAddressId: "",
			isEditingAddress: false,
			editedAddress: null,
			actions: {
				setCityName: (cityName) => {
					set({
						cityName,
						districtName: "",
						wardName: "",
					})
				},
				setDistrictName: (districtName) => {
					set({
						districtName: districtName,
						wardName: "",
					})
				},
				setWardName: (wardName) => {
					set({
						wardName: wardName,
					})
				},
				selectAddressId: (selectedAddressId) => {
					set({
						selectedAddressId,
					})
				},
				setIsEditingAddress: (isEditingAddress) => {
					if (isEditingAddress === false) {
						set({
							editedAddress: null,
						})
					}
					set({
						isEditingAddress,
					})
				},
				setEditedAddress: (editedAddress) => {
					set({
						editedAddress,
					})
				},
			},
		}))
	)
)
