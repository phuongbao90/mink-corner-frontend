import { useImmerReducer } from "use-immer"
import { useEffect, useCallback } from "react"
import { Product, ProductItem } from "@/features"

export interface ProductItemWithExtraProps extends ProductItem {
	isSelected: boolean
}

export type VariationType = {
	label: string | undefined
	values: ProductItemWithExtraProps[]
}

type TState = {
	variants: VariationType
	selectedProductVariant: ProductItem | null
}

type TAction =
	| { type: "select_variant"; payload: ProductItem }
	| { type: "set_variants"; payload: VariationType }

function reducer(draft: TState, action: TAction) {
	switch (action.type) {
		case "select_variant":
			const selectedProductVariant = action.payload
			const selectedSKU = selectedProductVariant?.SKU

			draft.variants.values?.forEach((productVariant) => {
				productVariant.isSelected = productVariant.SKU === selectedSKU
			})

			draft.selectedProductVariant = selectedProductVariant

			break
		case "set_variants":
			draft.variants = action.payload
			break

		default:
			break
	}
}

const initialValues: {
	variants: VariationType
	selectedProductVariant: ProductItem | null
} = {
	variants: {} as VariationType,
	selectedProductVariant: null,
}

export const useGetProductVariation = (product: Product | undefined) => {
	const [{ variants, selectedProductVariant }, dispatch] = useImmerReducer(
		reducer,
		initialValues
	)

	const { product_item } = product || {}

	const selectProductVariant = useCallback(
		(selectedProductVariant: ProductItem) => {
			dispatch({ type: "select_variant", payload: selectedProductVariant })
		},
		[]
	)

	useEffect(() => {
		if (!product_item) return
		const data = product_item.reduce((acc, curr) => {
			const variationLabel = curr.product_item_id.variant?.variation.name
			if (acc.label) {
				acc.values.push({ ...curr.product_item_id, isSelected: false })
			} else {
				acc.label = variationLabel
				acc.values = [{ ...curr.product_item_id, isSelected: false }]
			}
			return acc
		}, {} as VariationType)

		dispatch({ type: "set_variants", payload: data })
	}, [product_item])

	return {
		variants,
		selectedProductVariant,
		selectProductVariant,
	}
}
