import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ProductList } from "./ProductList"
import { createWrapper } from "mocks/helpers/react-query-wrapper"
import { routerWrapper } from "mocks/helpers/router-wrapper"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { createMockRouter } from "../../../mocks/helpers/create-mock-router"

describe("test ProductList component", () => {
	test("render placeholder text", async () => {
		render(
			<RouterContext.Provider value={createMockRouter()}>
				<ProductList />
			</RouterContext.Provider>,
			{
				wrapper: createWrapper(),
			}
		)

		expect(
			screen.getByRole("heading", {
				name: /product list/i,
			})
		).toBeInTheDocument()

		await waitFor(() => {
			expect(screen.getAllByTestId("product-card")).toHaveLength(8)
		})
	})
})
