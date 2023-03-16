import { FC } from "react"

import {
	DrawerMobileNav,
	Footer,
	Header,
	MobileNotification,
} from "@/components"
import { DrawerCart } from "@/components/drawer-cart"
import { AppShell, Box } from "@mantine/core"

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
			<Box h="100%">
				{children}
				<DrawerCart />
				<DrawerMobileNav />
			</Box>
			<MobileNotification />
		</AppShell>
	)
}
