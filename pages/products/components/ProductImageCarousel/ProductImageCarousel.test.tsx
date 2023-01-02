import { act, render, screen } from "@testing-library/react"
import ProductImageCarousel from "./ProductImageCarousel"
import { placeholder_product } from "../../../../mocks/placeholders/placeholder-product-list"
import userEvent from "@testing-library/user-event"

describe("Product Image Carousel", () => {
	test("return no image available if no images provided", () => {
		render(<ProductImageCarousel images={undefined} />)
		screen.getByText(/no image available/i)
	})
	test("render images correctly", async () => {
		render(<ProductImageCarousel images={placeholder_product.images} />)
		const images = screen.queryAllByAltText("product-image")
		expect(images).toHaveLength(5)
	})
	test("render carousel buttons correctly", async () => {
		render(<ProductImageCarousel images={placeholder_product.images} />)
		const prevButton = screen.getByTitle("previous-slide-button")
		const nextButton = screen.getByTitle("next-slide-button")
		const user = userEvent.setup()

		expect(prevButton).toBeDisabled()
		expect(nextButton).toBeEnabled()

		expect(await screen.findByTestId("active-slide-0")).not.toBeNull()
		user.click(nextButton)
		expect(await screen.findByTestId("active-slide-1")).not.toBeNull()
	})
})
