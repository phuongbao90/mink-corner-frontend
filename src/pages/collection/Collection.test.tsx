import { within } from "@testing-library/react"
import { createMockRouter, renderAppWrapper } from "@/mocks/helpers"
import CollectionPage from "./index.page"

describe("INTEGRATION-TEST: Collection", () => {
	test("render correctly", async () => {
		const router = createMockRouter({
			pathname: "/collection",
		})

		const result = renderAppWrapper(<CollectionPage />, { router })

		result.queryByText(/bộ sưu tập của mink's corner/i)

		const categoryList = await result.findByRole("list", {
			name: /category\-list/i,
		})

		expect(categoryList).toBeInTheDocument()
		expect(within(categoryList).getAllByRole("listitem")).toHaveLength(4)
		// expect(result.getByText(/nhẫn/i)).toBeInTheDocument()
		// expect(result.getByText(/áo/i)).toBeInTheDocument()
		// expect(result.getByText(/dây chuyền/i)).toBeInTheDocument()
		// expect(result.getByText(/nón/i)).toBeInTheDocument()
	})
})
