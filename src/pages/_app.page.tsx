import "@/styles/globals.css"
import { ReactElement, ReactNode, useEffect } from "react"
import { DefaultSeo } from "next-seo"
import { enableMapSet } from "immer"
import { NextPage } from "next"
import { AppProps } from "next/app"
import { Head, LoadingOverlay, RootLayout } from "@/components"
import {
	DEFAULT_SEO_DESCRIPTION,
	DEFAULT_SEO_TITLE,
	SITE_URL,
	LOGO_OG_FILE_ID,
	// ENABLE_MOCK,
	// NODE_ENV,
} from "@/constant"
import { next_createUser, next_getUser } from "@/features/user"
import { MantineProvider, ReactQueryProvider } from "@/providers"
import { appendImageUrl, storage } from "@/utils"

// import { initMocks } from "@/mocks"
// if (ENABLE_MOCK && (NODE_ENV === "development" || NODE_ENV === "test")) {
// 	initMocks()
// }

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
			<DefaultSeo
				title={DEFAULT_SEO_TITLE}
				description={DEFAULT_SEO_DESCRIPTION}
				canonical="https://www.canonical.ie/"
				openGraph={{
					type: "website",
					locale: "vi_VN",
					url: SITE_URL,
					siteName: "Mink's Corner",
					title: DEFAULT_SEO_TITLE,
					description: DEFAULT_SEO_DESCRIPTION,
					images: [{ url: appendImageUrl(LOGO_OG_FILE_ID) }],
				}}
			/>
			<Head />

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
