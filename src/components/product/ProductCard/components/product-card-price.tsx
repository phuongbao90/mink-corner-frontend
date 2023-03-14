import { useProductContext } from "@/components/product/ProductCard/product-card"
import { useProductPrice } from "@/features/products"
import { formatCurrency } from "@/utils"
import { Center, Text } from "@mantine/core"

export const ProductCardPrice = () => {
	const { loadedVariant, product } = useProductContext()
	const { originalPrice, effectivePrice, isDiscounted } = useProductPrice(
		loadedVariant,
		product.category.promotion_item_id
	)

	return (
		<Center>
			{isDiscounted && (
				<Text
					fw={400}
					data-testid="original-price"
					td="line-through"
					c="gray.6"
					mr={{
						base: 4,
						xs: "xs",
					}}
					sx={(theme) => ({
						fontSize: 13,
						[theme.fn.largerThan("xs")]: {
							fontSize: 15,
						},
					})}
				>
					{formatCurrency(originalPrice)}
				</Text>
			)}

			<Text
				fw={600}
				data-testid="effective-price"
				sx={(theme) => ({
					fontSize: 13,
					[theme.fn.largerThan("xs")]: {
						fontSize: 16,
					},
				})}
			>
				{formatCurrency(effectivePrice)}
			</Text>
		</Center>
	)
}
