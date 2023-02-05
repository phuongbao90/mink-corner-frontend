import { waitFor } from "@testing-library/react"
import { Header } from "./"
import "@testing-library/jest-dom"
import { createMockRouter, renderAppWrapper } from "@/mocks/helpers"
import userEvent from "@testing-library/user-event"

describe("UNIT-TEST: Header component", () => {
	it("function properly", async () => {
		const router = createMockRouter({ pathname: "/" })
		const result = renderAppWrapper(<Header />, { router })

		/* ------------------------- render links correctly ------------------------- */
		const collection_nav_link = result.getByText(/bộ sưu tập/i)
		const contact_nav_link = result.getByRole("link", {
			name: /Liên hệ/i,
		})
		const cart_nav_link = result.getByRole("button", {
			name: /cart/i,
		})
		const search_nav_link = result.getByRole("button", {
			name: /search/i,
		})
		const home_logo = result.getByRole("link", {
			name: /home-logo/i,
		})
		expect(contact_nav_link).toHaveAttribute("href", "/lien-he")

		/* ---------------------------- render logo image --------------------------- */
		const testImage = document.querySelector("img") as HTMLImageElement
		expect(testImage.alt).toContain("Mink Corner logo")

		/* --------------------------- navigate correctly --------------------------- */

		const user = userEvent.setup()
		user.click(collection_nav_link)

		await waitFor(() => {
			expect(router.push).toHaveBeenCalledWith("/collection")
		})

		user.click(cart_nav_link)
		await waitFor(() => {
			expect(router.push).toHaveBeenNthCalledWith(2, "/cart")
		})
	})
})
