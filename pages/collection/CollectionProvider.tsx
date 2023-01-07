import { useFetchCategoriesQuery } from "lib/react-query/queries/category-queries"
import { Categories, Category, Product } from "lib/types"
import React, {
	createContext,
	Dispatch,
	ReactNode,
	useCallback,
	useContext,
} from "react"
import { useImmerReducer } from "use-immer"
import { placeholder_product } from "../../mocks/placeholders/placeholder-product-list"

type State = {
	products: Product[]
	categories: Category[]
}

interface IContext extends State {
	fetchProducts: VoidFunction
}

const CollectionContext = createContext<IContext | undefined>(undefined)
const initialState: State = {
	products: [],
	categories: [],
}

export const useCollectionContext = () => {
	const context = useContext(CollectionContext)
	if (!context) {
		throw new Error(
			"useCollectionContext must be used within CollectionContext.Provider"
		)
	}
	return context
}

type Action = { type: "FETCH_PRODUCTS" }

function immerReducer(state: State, action: Action) {
	const { type } = action
	switch (type) {
		case "FETCH_PRODUCTS":
			state.products = [placeholder_product]
			break

		default:
			break
	}
}

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useImmerReducer(immerReducer, initialState)
	const { data: categories } = useFetchCategoriesQuery()

	const fetchProducts = useCallback(() => {
		dispatch({ type: "FETCH_PRODUCTS" })
	}, [])

	return (
		<CollectionContext.Provider value={{ ...state, fetchProducts, categories }}>
			{children}
		</CollectionContext.Provider>
	)
}
