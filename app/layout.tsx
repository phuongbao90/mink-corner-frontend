"use client"

import Footer from "components/common/Footer"
import Header from "components/common/Header"
import { ReactQueryWrapper } from "lib/react-query"
import { PropsWithChildren } from "react"
import "../styles/globals.css"

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<html lang="vn">
			<head />
			<body>
				<ReactQueryWrapper>
					<div className="min-h-screen flex flex-col">
						<Header />
						<main className="flex flex-1">{children}</main>
						<Footer />
					</div>
				</ReactQueryWrapper>
			</body>
		</html>
	)
}

export default RootLayout
