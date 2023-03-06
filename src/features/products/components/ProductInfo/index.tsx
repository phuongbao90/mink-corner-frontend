import { ProductActions } from "@/features/products/components/product-actions"
import { Product, PolicyList } from "@/features/products"
import { Box } from "@mantine/core"

export const ProductInfo = ({ product }: { product: Product }) => {
	return (
		<Box>
			<ProductActions product={product} />
			<Box mt={16}>
				<PolicyList />
			</Box>
		</Box>
	)
}
