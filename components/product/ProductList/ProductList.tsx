import { useGetHomePageProducts } from "lib/react-query/queries"
import React from "react"
import ProductCard from "../ProductCard"
import s from "./ProductList.module.css"

export const ProductList = () => {
	const { data } = useGetHomePageProducts()

	return (
		<div>
			<h2>product list</h2>
			<div className="grid grid-cols-4 gap-4">
				{data?.products?.map((product, index) => (
					<div key={product.id} className="">
						<ProductCard product={product} />
					</div>
				))}
			</div>
		</div>
	)
}
