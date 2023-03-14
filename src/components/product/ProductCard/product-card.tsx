import { createContext, ReactNode, useContext } from "react"
import { useProductVariant } from "@/hooks"
import { Product, ProductItem } from "@/features/products"
import { Card } from "@mantine/core"
import {
	ProductCardCoverImage,
	ProductCardDiscountBadge,
	ProductCardNewReleasedBadge,
	ProductCardOutOfStockBadge,
	ProductCardPrice,
	ProductCardTitle,
} from "@/components/product/ProductCard/components"

type Props = {
	product: Product
	children?: ReactNode | ReactNode[]
}

type ContextType = {
	product: Product
	loadedVariant: ProductItem | undefined
}

const ProductContext = createContext<ContextType>({} as ContextType)
export const useProductContext = () => {
	const context = useContext(ProductContext)
	if (!context) {
		throw new Error("must be used within product-card-context")
	}
	return context
}

export const ProductCard = ({ product, children }: Props) => {
	const { loadedVariant } = useProductVariant(product)

	if (!product) return null

	return (
		<ProductContext.Provider value={{ product, loadedVariant }}>
			<Card
				radius="lg"
				withBorder
				data-testid="product-card"
				sx={{ borderColor: "#f5f5f5", position: "relative" }}
			>
				{children}
			</Card>
		</ProductContext.Provider>
	)
}

ProductCard.CoverImage = ProductCardCoverImage
ProductCard.Title = ProductCardTitle
ProductCard.Price = ProductCardPrice
ProductCard.DiscountBadge = ProductCardDiscountBadge
ProductCard.OutOfStockBadge = ProductCardOutOfStockBadge
ProductCard.NewReleasedBadge = ProductCardNewReleasedBadge
