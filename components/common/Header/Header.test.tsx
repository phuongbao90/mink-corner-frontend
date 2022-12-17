import { render, screen } from "@testing-library/react"
import Header from "."
import "@testing-library/jest-dom"
import MinkCornerLogo from "public/images/MinkCornerLogo.jpg"
import Image from "next/image"

describe("Header", () => {
	it("renders nav links", () => {
		render(<Header />)

		const collection_nav_link = screen.getByRole("link", {
			name: /Bộ sưu tập/i,
		})
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

		expect(collection_nav_link).toBeInTheDocument()
		expect(contact_nav_link).toBeInTheDocument()
		expect(cart_nav_link).toBeInTheDocument()
		expect(search_nav_link).toBeInTheDocument()
		expect(home_logo).toBeInTheDocument()
	})

	it("Render logo image", () => {
		render(<Image src={MinkCornerLogo} alt="Mink Corner logo" />)
		const testImage = document.querySelector("img") as HTMLImageElement
		expect(testImage.alt).toContain("Mink Corner logo")
	})
})
