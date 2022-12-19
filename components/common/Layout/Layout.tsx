import { FC } from "react"
import Footer from "../Footer"
import Header from "../Header"

type LayoutProps = {
	children: React.ReactNode
}

export const RootLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex flex-1">{children}</main>
			<Footer />
		</div>
	)
}
