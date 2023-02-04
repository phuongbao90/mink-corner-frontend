import { useGetProducts } from "@/features"
import React from "react"
import ProductCard from "../ProductCard"

export const ProductList = () => {
	const { data: products, isSuccess } = useGetProducts()

	if (isSuccess) {
		return (
			<div>
				<h2>sản phẩm mới</h2>
				<div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-4">
					{products.map((product, index) => (
						<div key={product.id} className="">
							<ProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		)
	}

	return <div>loading</div>
}
