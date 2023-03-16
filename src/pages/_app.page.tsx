import "@/styles/globals.css"

import { ReactElement, ReactNode, useEffect } from "react"

import { enableMapSet } from "immer"
import { NextPage } from "next"
import { AppProps } from "next/app"
import Head from "next/head"

import { LoadingOverlay, RootLayout } from "@/components"
import { NODE_ENV } from "@/constant"
import { next_createUser, next_getUser } from "@/features/user"
import { initMocks } from "@/mocks"
import { MantineProvider, ReactQueryProvider } from "@/providers"
import { storage } from "@/utils"

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
				const createdUserResponse = await next_createUser()

				if (createdUserResponse && createdUserResponse.id) {
					storage.setItem("user_id", createdUserResponse.id)
				}

				return
			}

			const retrievedUser = await next_getUser(storedUserId)

			if (!retrievedUser) {
				const createdUser = await next_createUser()
				if (createdUser && createdUser.id)
					storage.setItem("user_id", createdUser.id)
				return
			}
		}

		validateUserIdFromLocalStorage()
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

					<LoadingOverlay />
				</MantineProvider>
			</ReactQueryProvider>
		</>
	)
}

export default MyApp
