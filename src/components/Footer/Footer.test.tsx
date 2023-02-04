import { render, screen } from "@testing-library/react"
import { Footer } from "."
import "@testing-library/jest-dom"

describe("Footer", () => {
	it("render about story", () => {
		render(<Footer />)
		screen.getByRole("heading", {
			name: /Về Mink Corner/i,
		})
		screen.getByRole("heading", {
			name: /thông tin/i,
		})
		screen.getByRole("heading", {
			name: /liên hệ/i,
		})
		screen.getByRole("heading", {
			name: /fanpage/i,
		})
	})
	it("render nav link", () => {})
})
