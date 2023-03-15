import {
	useAddCartItemMutation,
	useGetCart,
	useRemoveCartItem,
	useUpdateCartItem,
} from "@/features/cart"
import { Product, ProductSlice } from "@/features/products"
import { useGetUser } from "@/features/user"
import { createProductSlice } from "@/store/slices/product-slice"
import { createContext, useContext, useEffect, useMemo, useRef } from "react"
import { createStore, useStore } from "zustand"
import { immer } from "zustand/middleware/immer"
import { devtools, subscribeWithSelector } from "zustand/middleware"
import { isEqual } from "lodash"

const createProductStore = () =>
	createStore(subscribeWithSelector(devtools(immer(createProductSlice))))

type ProductProviderProps = React.PropsWithChildren<{ product: Product }>
type ProductStore = ReturnType<typeof createProductStore>

const ProductContext = createContext<ProductStore | null>(null)

export const ProductProvider = ({
	children,
	product,
}: ProductProviderProps) => {
	const { product_item } = product
	const store = useRef(createProductStore()).current
	const { getState, setState } = store
	const setProduct = getState().actions.setProduct
	const selectedOptions = useStore(store, (s) => s.selectedOptions)
	const variantRecord = useStore(store, (s) => s.variantRecord)

	useEffect(() => {
		if (product) setProduct(product)
	}, [product])

	const selected_product_item = useMemo(() => {
		if (!variantRecord?.size || !product_item?.length || !selectedOptions?.size)
			return

		let product_item_id: string | undefined = undefined

		for (const id of variantRecord.keys()) {
			if (isEqual(variantRecord.get(id), selectedOptions)) {
				product_item_id = id
			}
		}

		const foundProduct = (product_item || []).find(
			(v) => v.id === product_item_id
		)
		return foundProduct
	}, [selectedOptions, variantRecord, product_item])

	useEffect(() => {
		if (selected_product_item) {
			const inStock = selected_product_item.quantity > 0
			setState({
				quantity: 1,
				inStock,
				selected_product_item,
				disabled: !inStock,
				maxQuantityMet: false,
			})
			return
		}
		setState({
			quantity: 1,
			inStock: false,
			selected_product_item: undefined,
			disabled: true,
			maxQuantityMet: false,
		})
	}, [selected_product_item])

	return (
		<ProductContext.Provider value={store}>{children}</ProductContext.Provider>
	)
}

export function useProductContext<T>(
	selector: (state: ProductSlice) => T,
	equalityFn?: (left: T, right: T) => boolean
): T {
	const store = useContext(ProductContext)
	if (!store) throw new Error("Missing ProductContext.Provider in the tree")
	return useStore(store, selector, equalityFn)
}

export function useProductState() {
	return useProductContext(({ actions, ...others }) => others)
}
export function useProductActions() {
	return useProductContext((s) => s.actions)
}
