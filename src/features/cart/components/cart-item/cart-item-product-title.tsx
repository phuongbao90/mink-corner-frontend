import { useCartItemContext } from "@/features/cart/templates/cart-item"
import { useBoundStore } from "@/store/useStore"
import { Title } from "@mantine/core"
import { useRouter } from "next/router"

// export const ProductTitle = () => {
// 	return <div>2222</div>
// }

export const ProductTitle = () => {
	const router = useRouter()
	const toggleIsSidebarCartVisible = useBoundStore(
		(s) => s.actions.toggleIsSidebarCartVisible
	)
	const { cartItem } = useCartItemContext()

	return (
		<Title
			order={6}
			onClick={() => {
				toggleIsSidebarCartVisible()
				router.push(`/products/${cartItem.product_item_id.product.slug}`)
			}}
			sx={(theme) => ({
				cursor: "pointer",
				[theme.fn.smallerThan("xs")]: {
					fontSize: 12,
				},
			})}
			truncate
			tt="uppercase"
		>
			{cartItem.product_item_id.product.name}
		</Title>
	)
}
