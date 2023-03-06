import { useGetCart } from "@/features/cart"
import { CartTemplate } from "@/features/cart/templates"
import { useBoundStore } from "@/store/useStore"
import { useMediaQuery } from "@mantine/hooks"
import { Box, createStyles, Drawer, Flex, Title } from "@mantine/core"
import { ShoppingBag } from "react-feather"

const useStyles = createStyles((theme) => ({
	root: {},
	header: {
		borderBottomWidth: 2,
		borderColor: "black",
		padding: "16px 16px",
	},
	closeButton: {},
	title: {
		marginTop: 4,
	},
	body: {
		height: "100%",
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
			overlayOpacity={0.55}
			overlayBlur={3}
			size={isMobile ? "85%" : 500}
			styles={{
				drawer: {
					display: "flex",
					flexDirection: "column",
				},
				body: {
					flexGrow: 1,
					overflowY: "auto",
				},
			}}
		>
			<Box px={isMobile ? "sm" : "lg"} pt={4} h="100%">
				<CartTemplate />
			</Box>
		</Drawer>
	)
}
