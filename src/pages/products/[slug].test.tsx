import { screen, waitFor } from "@testing-library/react"
import { renderAppWrapper } from "@/mocks/helpers"
import ProductDetailPage from "./[slug].page"
import { createMockRouter } from "@/mocks/helpers/create-mock-router"
import userEvent from "@testing-library/user-event"

describe("Product Detail", () => {
	test("given incorrect product slug -> show no product found", async () => {
		const router = createMockRouter({
			query: {
				slug: `ao-lenzzzzz`,
			},
		})

		const result = renderAppWrapper(<ProductDetailPage />, {
			router,
		})

		expect(await result.findByText(/Rất tiếc sản phầm này không tồn tại./i))
	})
	test(`render product detail page of product (with no variant) 
					- show images, title, category, add to cart button
					- does not show variant selection buttons
					- when click on add to cart button show dialog
	`, async () => {
		const router = createMockRouter({
			query: { slug: `day-chuyen-hinh-trai-tim` },
		})

		const result = renderAppWrapper(<ProductDetailPage />, { router })

		expect(
			await result.findAllByAltText("product-image-carousel")
		).toHaveLength(3)
		expect(
			await result.findAllByAltText("product-image-masonary")
		).toHaveLength(3)

		expect(
			screen.queryByTestId("select-variant-button")
		).not.toBeInTheDocument()

		const addToCartButton = await screen.findByRole("button", {
			name: "Mua ngay",
		})

		expect(
			await result.findByRole("heading", { level: 2, name: /dây chuyền/i })
		)
		expect(
			await result.findByRole("heading", {
				level: 1,
				name: /dây chuyền hình trái tim/i,
			})
		)
		expect(await result.findByText(87000))
		expect(await result.findByText(/mô tả sản phẩm/i))
		expect(await result.findByText(/chi tiết/i))
		expect(addToCartButton).toBeInTheDocument()

		const user = userEvent.setup()

		user.click(addToCartButton)
		expect(await result.findByText(/thông báo/i))
		expect(await result.findByText(/Đã thêm sản phẩm vào giỏ hàng/i))
	})
	test(`render product detail page of product (with variation selection) + (same images) 
					- show images, title, category, buttons
					
					- initially - size S button is active (with red text)
					- when click on sieze M button -> change active state, product price
					- when click on addToCart button -> a toast should appear
	`, async () => {
		const router = createMockRouter({ query: { slug: `ao-len` } })

		const result = renderAppWrapper(<ProductDetailPage />, { router })

		expect(
			await result.findAllByAltText("product-image-carousel")
		).toHaveLength(4)
		expect(
			await result.findAllByAltText("product-image-masonary")
		).toHaveLength(4)

		const size_S_button = await screen.findByRole("button", { name: "S" })
		const size_M_button = await screen.findByRole("button", { name: "M" })
		const addToCartButton = await screen.findByRole("button", {
			name: "Mua ngay",
		})

		expect(await result.findByRole("heading", { level: 2, name: /áo/i }))
		expect(await result.findByRole("heading", { level: 1, name: /áo len/i }))
		expect(await result.findByText(200000))
		expect(await result.findByText(/mô tả sản phẩm/i))
		expect(await result.findByText(/chi tiết/i))
		expect(await result.findByText(/kích thước/i))
		expect(addToCartButton).toBeInTheDocument()
		expect(size_S_button).toBeInTheDocument()
		expect(size_M_button).toBeInTheDocument()
		expect(size_S_button.className.includes("text-red-600")).toBeTruthy()
		expect(size_M_button.className.includes("text-red-600")).toBeFalsy()

		const user = userEvent.setup()

		user.click(size_M_button)
		expect(await result.findByText(300000))
		expect(size_S_button.className.includes("text-red-600")).toBeFalsy()
		expect(size_M_button.className.includes("text-red-600")).toBeTruthy()

		user.click(addToCartButton)
		expect(await result.findByText(/thông báo/i))
		expect(await result.findByText(/Đã thêm sản phẩm vào giỏ hàng/i))
	})
	test(`render product detail page of product (with variation selection) + (different images) 
					- initially - 1st variant has 5 images
					- when click on color yellow button -> images count changes to 6
	`, async () => {
		const router = createMockRouter({ query: { slug: `nhan-canh-hoa` } })
		const result = renderAppWrapper(<ProductDetailPage />, { router })

		expect(
			await result.findAllByAltText("product-image-carousel")
		).toHaveLength(5)
		expect(
			await result.findAllByAltText("product-image-masonary")
		).toHaveLength(5)

		const color_white_button = await screen.findByRole("button", {
			name: /trắng/i,
		})
		const color_yellow_button = await screen.findByRole("button", {
			name: /vàng/i,
		})

		expect(await result.findByText(/màu/i))
		expect(color_white_button).toBeInTheDocument()
		expect(color_yellow_button).toBeInTheDocument()
		expect(color_white_button.className.includes("text-red-600")).toBeTruthy()
		expect(color_yellow_button.className.includes("text-red-600")).toBeFalsy()

		const user = userEvent.setup()

		user.click(color_yellow_button)

		expect(await result.findByText(120000))
		expect(color_white_button.className.includes("text-red-600")).toBeFalsy()
		expect(color_yellow_button.className.includes("text-red-600")).toBeTruthy()
		expect(
			await result.findAllByAltText("product-image-carousel")
		).toHaveLength(6)
		expect(
			await result.findAllByAltText("product-image-masonary")
		).toHaveLength(6)

		/* ------------------------------ TEST CAROUSEL ----------------------------- */

		const previous_carousel_button = await screen.findByRole("button", {
			name: "previous-slide-button",
		})
		const next_carousel_button = await screen.findByRole("button", {
			name: "next-slide-button",
		})

		expect(previous_carousel_button).toHaveAttribute("disabled")
		await waitFor(() => {
			expect(next_carousel_button).not.toHaveAttribute("disabled")
			expect(result.getByTestId("active-slide-0")).toBeInTheDocument()
		})
		user.click(next_carousel_button)
		await waitFor(() => {
			expect(previous_carousel_button).not.toHaveAttribute("disabled")
			expect(next_carousel_button).not.toHaveAttribute("disabled")
			expect(result.getByTestId("active-slide-1")).toBeInTheDocument()
		})
		user.click(next_carousel_button)
		await waitFor(() => {
			expect(previous_carousel_button).not.toHaveAttribute("disabled")
			expect(next_carousel_button).not.toHaveAttribute("disabled")
			expect(result.getByTestId("active-slide-2")).toBeInTheDocument()
		})
		user.click(next_carousel_button)
		await waitFor(() => {
			expect(previous_carousel_button).not.toHaveAttribute("disabled")
			expect(next_carousel_button).not.toHaveAttribute("disabled")
			expect(result.getByTestId("active-slide-3")).toBeInTheDocument()
		})
		user.click(next_carousel_button)
		await waitFor(() => {
			expect(previous_carousel_button).not.toHaveAttribute("disabled")
			expect(next_carousel_button).toHaveAttribute("disabled")
			expect(result.getByTestId("active-slide-4")).toBeInTheDocument()
		})
		user.click(previous_carousel_button)
		await waitFor(() => {
			expect(previous_carousel_button).not.toHaveAttribute("disabled")
			expect(next_carousel_button).not.toHaveAttribute("disabled")
			expect(result.getByTestId("active-slide-3")).toBeInTheDocument()
		})
	})
})
