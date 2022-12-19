import { usePrice } from "lib/product"
import { Product } from "lib/types"
import { FC } from "react"
import s from "./ProductCard.module.css"

type Props = {
	product: Product
}

const ProductCard: FC<Props> = ({ product }) => {
	const { originalPrice, effectivePrice, discountPercentage, discountAmount } =
		usePrice(product)

	return <div>ProductCard</div>
}

export default ProductCard
