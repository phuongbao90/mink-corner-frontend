import { render } from "@testing-library/react"
import { NextRouter } from "next/router"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createMockRouter } from "./create-mock-router"
import { ReactNode, ReactElement } from "react"

const testQueryClient = new QueryClient({
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

const defaultRouter = createMockRouter({
	pathname: "/",
})

export const createReactQueryWrapper = () => {
	return ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={testQueryClient}>
			{children}
		</QueryClientProvider>
	)
}

export const renderAppWrapper = (
	ui: ReactNode,
	options: {
		router?: Partial<NextRouter>
	} = {
		router: defaultRouter,
	}
) => {
	const { router } = options
	const _router = createMockRouter({
		...router,
	})
	const { rerender, ...result } = render(
		<QueryClientProvider client={testQueryClient}>
			<RouterContext.Provider value={_router}>{ui}</RouterContext.Provider>
		</QueryClientProvider>
	)

	return {
		...result,
		rerender: (rerenderUi: ReactElement) =>
			rerender(
				<QueryClientProvider client={testQueryClient}>
					<RouterContext.Provider value={_router}>
						{rerenderUi}
					</RouterContext.Provider>
				</QueryClientProvider>
			),
	}
}
