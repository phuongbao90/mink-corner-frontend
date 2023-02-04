import { render, screen, waitFor } from "@testing-library/react"
import { Header } from "./"
import "@testing-library/jest-dom"
import MinkCornerLogo from "/public/images/MinkCornerLogo.jpg"
import Image from "next/image"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { createMockRouter } from "@/mocks/helpers"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"

describe("Header", () => {
	it("renders nav links", () => {
		const router = createMockRouter({})
		render(
			<RouterContext.Provider value={router}>
				<Header />
			</RouterContext.Provider>
		)

		const collection_nav_link = screen.getByText(/bộ sưu tập/i)

		const contact_nav_link = screen.getByRole("link", {
			name: /Liên hệ/i,
		})
		const cart_nav_link = screen.getByRole("button", {
			name: /cart/i,
		})
		const search_nav_link = screen.getByRole("button", {
			name: /search/i,
		})
		const home_logo = screen.getByRole("link", {
			name: /home-logo/i,
		})

		expect(contact_nav_link).toHaveAttribute("href", "/lien-he")
	})

	it("Render logo image", () => {
		render(<Image src={MinkCornerLogo} alt="Mink Corner logo" />)
		const testImage = document.querySelector("img") as HTMLImageElement
		expect(testImage.alt).toContain("Mink Corner logo")
	})

	it("navigate correctly", async () => {
		const router = createMockRouter({
			pathname: "/",
		})
		render(
			<RouterContext.Provider value={router}>
				<Header />
			</RouterContext.Provider>
		)

		const collection_nav_link = screen.getByText(/Bộ sưu tập/i)

		const user = userEvent.setup()
		user.click(collection_nav_link)

		await waitFor(() => {
			expect(router.push).toHaveBeenCalledWith("/collection")
		})
	})
})
