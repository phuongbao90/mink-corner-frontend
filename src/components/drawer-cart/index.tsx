import { useGetCart } from "@/features/cart"

import { useBoundStore } from "@/store/useStore"
import { useMediaQuery } from "@mantine/hooks"
import { Box, createStyles, Drawer, Flex, Title } from "@mantine/core"
import { ShoppingBag } from "react-feather"
import { CartSidebarView } from "@/features/cart/templates/cart-sidebar-view"

const useStyles = createStyles((theme) => ({
	root: {
		backgroundColor: "yellow",
	},
	header: {
		borderBottomWidth: 2,
		borderColor: "black",
		padding: "16px 16px",
		zIndex: 9,
		borderBottom: 1,
		borderBottomColor: "#eaeaea",
		borderBottomStyle: "solid",
	},
	closeButton: {},
	title: {
		marginTop: 4,
	},
	body: {
		minHeight: "90dvh",
		display: "grid",
	},
}))

export const DrawerCart = () => {
	const isSidebarCartVisible = useBoundStore((s) => s.isSidebarCartVisible)
	const toggleIsSidebarCartVisible = useBoundStore(
		(s) => s.actions.toggleIsSidebarCartVisible
	)
	const { classes } = useStyles()
	const { data: cart } = useGetCart()
	const isMobile = useMediaQuery("(max-width: 700px)", true, {
		getInitialValueInEffect: false,
	})

	return (
		<Drawer
			classNames={{
				...classes,
			}}
			opened={isSidebarCartVisible}
			onClose={() => toggleIsSidebarCartVisible(false)}
			title={
				<Flex align="center">
					<ShoppingBag size={22} />
					<Title ml={12} order={5}>
						{cart?.items_func.count || 0} sản phẩm
					</Title>
				</Flex>
			}
			position="right"
			overlayProps={{
				opacity: 0.55,
				blur: 2,
			}}
			size={isMobile ? "85%" : 500}
		>
			<CartSidebarView />
		</Drawer>
	)
}
