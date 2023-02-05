import { waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ProductList } from "./ProductList"
import { createMockRouter, renderAppWrapper } from "@/mocks/helpers"

describe("UNIT-TEST - ProductList component", () => {
	test("render title + 3 product cards", async () => {
		const router = createMockRouter()
		const result = renderAppWrapper(<ProductList />, { router })

		expect(result.getByText("loading")).toBeInTheDocument()

		await waitFor(() => {
			expect(
				result.getByRole("heading", {
					name: /sản phẩm mới/i,
				})
			).toBeInTheDocument()
		})

		expect(result.getByText(/áo len/i)).toBeInTheDocument()
		expect(result.getByText(/nhẫn cánh hoa/i)).toBeInTheDocument()
		expect(result.getByText(/dây chuyền hình trái tim/i)).toBeInTheDocument()
	})
})
