import { AppShell, Box } from "@mantine/core"
import dynamic from "next/dynamic"
import { ReactNode } from "react"

const Footer = dynamic(
	() => import("@/components/Footer/Footer").then((comp) => comp.Footer),
	{
		loading: () => <p>loading</p>,
	}
)
const Header = dynamic(() =>
	import("@/components/Header/Header").then((comp) => comp.Header)
)
const DrawerCart = dynamic(() =>
	import("@/components/drawer-cart").then((comp) => comp.DrawerCart)
)
const MobileNotification = dynamic(() =>
	import("@/components").then((comp) => comp.MobileNotification)
)
const DrawerMobileNav = dynamic(() =>
	import("@/components/drawer-mobile-nav/index").then(
		(comp) => comp.DrawerMobileNav
	)
)

export const RootLayout = ({ children }: { children: ReactNode }) => {
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
