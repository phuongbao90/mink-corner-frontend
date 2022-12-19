import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

export const createWrapper = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
		logger: {
			log: console.log,
			warn: console.warn,
			// ✅ no more errors on the console
			error: () => {},
		},
	})

	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
