import { Product } from "@/features/products"
import { ProductProvider } from "@/store/context/product-context"
import { ProductCardTemplate } from "./ProductCard"

const ProductCard = ({ product }: { product: Product }) => {
	return (
		<ProductProvider product={product}>
			<ProductCardTemplate />
		</ProductProvider>
	)
}

export { ProductCard }
