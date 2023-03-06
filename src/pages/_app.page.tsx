import { ReactElement, ReactNode, useState, useEffect } from "react"
import "@/styles/globals.css"
import { RootLayout } from "@/components"
import { AppProps } from "next/app"
import { NextPage } from "next"
import { initMocks } from "@/mocks"
import { ENABLE_MOCK, FREE_SHIP_THRESHOLD, NODE_ENV } from "@/constant"
import { MantineProvider, ReactQueryProvider } from "@/providers"
import { storage } from "@/utils"
import { createUser, fetchUser } from "@/services"
import Head from "next/head"
import { enableMapSet } from "immer"

if (
	false &&
	// ENABLE_MOCK &&
	(NODE_ENV === "development" || NODE_ENV === "test")
) {
	initMocks()
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

enableMapSet()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout =
		Component.getLayout || ((page) => <RootLayout>{page}</RootLayout>)

	useEffect(() => {
		async function validateUserIdFromLocalStorage() {
			const storedUserId = storage.getItem("user_id")

			if (!storedUserId || storedUserId === "undefined") {
				const createdUser = await createUser()
				if (createdUser && createdUser.id) {
					storage.setItem("user_id", createdUser.id)
				}

				return
			}

			const retrievedUser = await fetchUser(storedUserId)

			if (!retrievedUser) {
				const createdUser = await createUser()
				if (createdUser && createdUser.id)
					storage.setItem("user_id", createdUser.id)
				return
			}
		}

		// validateUserIdFromLocalStorage()
	}, [])

	return (
		<>
			<Head>
				<title>Page title</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<ReactQueryProvider pageProps={pageProps}>
				<MantineProvider>
					{getLayout(<Component {...pageProps} />)}
				</MantineProvider>
			</ReactQueryProvider>
		</>
	)
}

export default MyApp
