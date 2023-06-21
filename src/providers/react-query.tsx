import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query"
import { ReactNode, useState } from "react"

export const ReactQueryProvider = ({
	children,
	pageProps,
}: {
	children: ReactNode
	pageProps: any
}) => {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>{children}</Hydrate>
			<ReactQueryDevtools />
		</QueryClientProvider>
	)
}
