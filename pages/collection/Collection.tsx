import { useCollectionContext } from "./CollectionProvider"
import { useEffect } from "react"

export const Collection = () => {
	const { products, fetchProducts } = useCollectionContext()

	useEffect(() => {
		fetchProducts()
	}, [fetchProducts])

	console.log("sss", products)

	return (
		<div>
			<h1>bộ sưu tập của mink's corner</h1>
		</div>
	)
}
