import { ReactElement, ReactNode, useState, useEffect } from "react"
import "@/styles/globals.css"
import { RootLayout } from "@/components"
import { AppProps } from "next/app"
import { NextPage } from "next"
import { initMocks } from "@/mocks"
import { ENABLE_MOCK } from "@/constant"
import { ReactQueryProvider } from "@/providers"

if (
	ENABLE_MOCK &&
	(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
) {
	initMocks()
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout || ((page) => <RootLayout>{page}</RootLayout>)

	// useEffect(() => {
	// 	async function fetchUserData() {
	// 		const storedUserId = localStorage.getItem("user_id")

	// 		if (storedUserId && storedUserId !== "undefined") {
	// 			// storage.setItem("user_id", data.id)
	// 			// const res = await fetch(`/api/user?user_id=${storedUserId}`)
	// 			// const data = await res.json()
	// 			// localStorage.setItem("user_id", data.id)
	// 		} else {
	// 			// const res = await fetch(`/api/user`, { method: "POST" })
	// 			// const createdUser = await res.json()
	// 			// localStorage.setItem("user_id", createdUser.id)
	// 			// storage.setItem("user_id", data.id)
	// 		}
	// 	}

	// 	fetchUserData()
	// }, [])

	return (
		<ReactQueryProvider pageProps={pageProps}>
			{getLayout(<Component {...pageProps} />)}
		</ReactQueryProvider>
	)
}

export default MyApp
