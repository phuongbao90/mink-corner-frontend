import { createMockRouter } from "mocks/helpers"
import { RouterContext } from "next/dist/shared/lib/router-context"

const router = createMockRouter({
	pathname: "/",
})

export function routerWrapper() {
	return ({ children }: { children: React.ReactNode }) => {
		return (
			<RouterContext.Provider value={router}>{children}</RouterContext.Provider>
		)
	}
}
