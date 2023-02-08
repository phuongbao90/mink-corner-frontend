import { ReactElement, ReactNode, useState, useEffect } from "react"
import "@/styles/globals.css"
import { RootLayout } from "@/components"
import { AppProps } from "next/app"
import { NextPage } from "next"
import { initMocks } from "@/mocks"
import { ENABLE_MOCK } from "@/constant"
import { ReactQueryProvider } from "@/providers"
import { storage } from "@/utils"
import { createUser, fetchUser } from "@/services"
import { useQueryClient } from "@tanstack/react-query"
import { userKeys } from "../features/user/user.actions"

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
	// const queryClient = useQueryClient()
	const getLayout =
		Component.getLayout || ((page) => <RootLayout>{page}</RootLayout>)

	useEffect(() => {
		async function validateUserIdFromLocalStorage() {
			const storedUserId = storage.getItem("user_id")

			if (!storedUserId || storedUserId === "undefined") {
				const createdUser = await createUser()
				if (createdUser && createdUser.id) {
					storage.setItem("user_id", createdUser.id)
					// queryClient.setQueryData(userKeys.detail(createdUser.id), createdUser)
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

		validateUserIdFromLocalStorage()
	}, [])

	return (
		<ReactQueryProvider pageProps={pageProps}>
			{getLayout(<Component {...pageProps} />)}
		</ReactQueryProvider>
	)
}

export default MyApp
