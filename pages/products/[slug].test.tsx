import { render, screen, waitFor } from "@testing-library/react"
import { AppWrapper, renderAppWrapper } from "mocks/helpers"
import ProductDetailPage from "./[slug].page"
import { createMockRouter } from "../../mocks/helpers/create-mock-router"
import { placeholder_products } from "../../mocks/placeholders/placeholder-product-list"

describe("Product Detail", () => {
	beforeEach(() => {})
	test("render UI if query success", async () => {
		const productId = 1
		const selectedProduct = placeholder_products.find(
			(el) => el.id === productId
		)
		const router = createMockRouter({
			query: {
				slug: `iPhone-9-${productId}`,
			},
		})

		const result = renderAppWrapper(<ProductDetailPage />, {
			router,
		})

		expect(screen.getByText("loading"))

		expect(
			await result.findByRole("heading", {
				level: 1,
				name: selectedProduct?.title,
			})
		)
		expect(await result.findByText("549"))
		expect(await result.findByText(/apple/i))
		expect(await result.findByText(/smartphones/i))
	})

	test("render product images carousel", () => {})
})
