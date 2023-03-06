import { useImmerReducer } from "use-immer"
import { useEffect } from "react"
import { ProductItem } from "@/features/products"

export interface ProductItemWithExtraProps extends ProductItem {
	isSelected: boolean
}

export type VariationType = {
	label: string | undefined
	values: ProductItemWithExtraProps[]
}

export type ProductVariationType = {
	variants: VariationType | null
	selectedProductVariant: ProductItem | null
}

type TAction =
	| { type: "select_variant"; payload: ProductItem }
	| { type: "set_variants"; payload: VariationType }

function reducer(draft: ProductVariationType, action: TAction) {
	switch (action.type) {
		case "select_variant":
			const selectedProductVariant = action.payload
			const selectedSKU = selectedProductVariant?.SKU

			draft.selectedProductVariant = selectedProductVariant
			draft.variants?.values?.forEach((productVariant) => {
				productVariant.isSelected = productVariant.SKU === selectedSKU
			})

			break
		case "set_variants":
			draft.variants = action.payload
			break

		default:
			break
	}
}

const initialValues = {
	variants: null,
	selectedProductVariant: null,
}

export const useGetProductVariation = (
	product_items: ProductItem[] | undefined
) => {
	const [{ variants, selectedProductVariant }, dispatch] = useImmerReducer<
		ProductVariationType,
		TAction
	>(reducer, initialValues)

	const selectProductVariant = (selectedProductVariant: ProductItem) => {
		dispatch({ type: "select_variant", payload: selectedProductVariant })
	}

	useEffect(() => {
		if (!product_items || variants) return
		const data = product_items.reduce((acc, curr) => {
			const variationLabel = curr.variant?.variation.name
			if (acc.label) {
				acc.values.push({ ...curr, isSelected: false })
			} else {
				acc.label = variationLabel
				acc.values = [{ ...curr, isSelected: false }]
			}
			return acc
		}, {} as VariationType)

		dispatch({ type: "set_variants", payload: data })
	}, [product_items])

	return {
		variants,
		selectedProductVariant,
		selectProductVariant,
	}
}
