import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import { ReactElement, ReactNode, useState } from "react"
import "../styles/globals.css"
import { RootLayout } from "components/common/Layout"
import { AppProps } from "next/app"
import { NextPage } from "next"

export const queryClient = new QueryClient()

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
	require("../mocks")
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const [queryClient] = useState(() => new QueryClient())

	const getLayout =
		Component.getLayout || ((page) => <RootLayout>{page}</RootLayout>)

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				{getLayout(<Component {...pageProps} />)}
				<ReactQueryDevtools initialIsOpen />
			</Hydrate>
		</QueryClientProvider>
	)
}
