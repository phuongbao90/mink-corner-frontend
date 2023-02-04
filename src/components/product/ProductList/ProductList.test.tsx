import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ProductList } from "./ProductList"
import { createReactQueryWrapper } from "@/mocks/helpers"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { createMockRouter } from "@/mocks/helpers/create-mock-router"

describe("test ProductList component", () => {
	test("render title + 3 product cards", async () => {
		render(
			<RouterContext.Provider value={createMockRouter()}>
				<ProductList />
			</RouterContext.Provider>,
			{
				wrapper: createReactQueryWrapper(),
			}
		)

		await waitFor(() =>
			expect(
				screen.getByRole("heading", {
					name: /sản phẩm mới/i,
				})
			).toBeInTheDocument()
		)

		expect(screen.getByText(/áo len/i)).toBeInTheDocument()
		expect(screen.getByText(/nhẫn cánh hoa/i)).toBeInTheDocument()
		expect(screen.getByText(/dây chuyền hình trái tim/i)).toBeInTheDocument()
	})
})
