import { pageRoutes } from "@/constant"
import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { useCartSidebar } from "@/store/use-ui-store"
import { TextProps, Title } from "@mantine/core"
import { useRouter } from "next/router"

export const ProductTitle = (props?: TextProps) => {
	const router = useRouter()

	const [, { close: closeCartSidebar }] = useCartSidebar()
	const { cartItem } = useCartItemContext()

	return (
		<Title
			order={6}
			onClick={() => {
				closeCartSidebar()
				router.push(
					`${pageRoutes.products}/${cartItem.product_item_id.product.slug}`
				)
			}}
			sx={(theme) => ({
				cursor: "pointer",
				[theme.fn.smallerThan("xs")]: {
					fontSize: 12,
				},
			})}
			lineClamp={1}
			tt="uppercase"
			{...(props || {})}
		>
			{cartItem.product_item_id.product.name}
		</Title>
	)
}
