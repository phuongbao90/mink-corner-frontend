import { FC } from "react"
import {
	Header,
	Footer,
	LoadingOverlay,
	DrawerMobileNav,
	MobileNotification,
} from "@/components"
import { AppShell, Box } from "@mantine/core"
import { DrawerCart } from "@/components/drawer-cart"

type LayoutProps = {
	children: React.ReactNode
}

export const RootLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<AppShell
			header={<Header />}
			footer={<Footer />}
			padding={0}
			fixed
			sx={{ backgroundColor: "#fbfafe" }}
			mt={100}
		>
			<Box component="main" mb={32}>
				{children}
				<LoadingOverlay />
				<DrawerCart />
				<DrawerMobileNav />
			</Box>
			<MobileNotification />
		</AppShell>
	)
}
