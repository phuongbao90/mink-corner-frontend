import { FC } from "react"
import { Header, Footer, LoadingOverlay, DrawerMobileNav } from "@/components"
import { AppShell, Box } from "@mantine/core"
import { DrawerCart } from "@/components/drawer-cart"
// import { useBoundStore } from "@/store/useStore"

type LayoutProps = {
	children: React.ReactNode
}

export const RootLayout: FC<LayoutProps> = ({ children }) => {
	// const isNavbarOpened = useBoundStore((s) => s.isNavbarOpened)

	return (
		<AppShell
			header={<Header />}
			footer={<Footer />}
			padding={0}
			fixed
			sx={{ backgroundColor: "#fbfafe" }}
			mt={100}
		>
			<Box component="main" mb={100}>
				{children}
				<LoadingOverlay />
				<DrawerCart />
				<DrawerMobileNav />
			</Box>
		</AppShell>
	)
}
