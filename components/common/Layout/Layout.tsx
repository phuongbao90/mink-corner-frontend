import { FC } from "react"
import Footer from "../Footer"
import Header from "../Header"

type LayoutProps = {
	children: React.ReactNode
}

export const RootLayout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen pb-48 sm:pb-0">
			<Header />
			<main className="flex flex-col">{children}</main>
			<Footer />
		</div>
	)
}
