import { useProductContext } from "@/components/product/ProductCard/product-card"
import { pageRoutes } from "@/constant"
import { Center, Title } from "@mantine/core"
import { useRouter } from "next/router"

export const ProductCardTitle = () => {
	const { product } = useProductContext()
	const router = useRouter()

	return (
		<Center mt="lg" mb={2}>
			<Title
				order={6}
				align="center"
				sx={(theme) => ({
					cursor: "pointer",
					fontSize: 12,
					[theme.fn.largerThan("xs")]: {
						fontSize: 14,
					},
				})}
				onClick={() => router.push(`${pageRoutes.products}/${product.slug}`)}
				fw={400}
				mih={42}
				lineClamp={2}
				tt="uppercase"
			>
				{product.name}
			</Title>
		</Center>
	)
}
