import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { waitFor } from "@testing-library/react"
import ProductCard from "./ProductCard"
import { placeholder_product_in_stock } from "../../../mocks/placeholders/placeholder-product-list"
import {
	placeholder_product_discounted,
	placeholder_product_out_of_stock,
	placeholder_product,
	placeholder_product_undiscounted,
} from "mocks/placeholders/placeholder-product-list"
import userEvent from "@testing-library/user-event"
import { createMockRouter } from "mocks/helpers"
import { RouterContext } from "next/dist/shared/lib/router-context"

const DEFAULT_PROPS = {
	product: placeholder_product,
}

const renderComponent = (props = {}) => {
	const router = createMockRouter()
	return {
		...render(
			<RouterContext.Provider value={router}>
				<ProductCard {...DEFAULT_PROPS} {...props} />
			</RouterContext.Provider>
		),
		props: {
			...DEFAULT_PROPS,
			...props,
			router,
		},
	}
}

describe("test ProductCard", () => {
	test("with data, render image, title", async () => {
		renderComponent()

		expect(screen.getByTestId("product-card")).toBeInTheDocument()
		expect(screen.getByText(/iphone 9/i)).toBeInTheDocument()
		expect(screen.getByText(/apple/i)).toBeInTheDocument()
		expect(screen.getByText(/smartphones/i)).toBeInTheDocument()

		const image = screen.getByAltText("product-image")
		expect(image).toHaveAttribute(
			"src",
			expect.stringContaining(encodeURIComponent(placeholder_product.thumbnail))
		)
	})
	test("with no discount, show original price only", () => {
		renderComponent({ product: placeholder_product_undiscounted })

		const originalPrice = screen.queryByTestId("original-price")
		const discountPercentage = screen.queryByTestId("discount-percentage")
		const effectivePrice = screen.queryByTestId("effective-price")

		expect(originalPrice).not.toBeInTheDocument()
		expect(discountPercentage).not.toBeInTheDocument()
		expect(effectivePrice).toBeInTheDocument()
	})
	test("with discount, show original, effective prices, discount percentage", () => {
		renderComponent({ product: placeholder_product_discounted })

		const originalPrice = screen.queryByTestId("original-price")
		const discountPercentage = screen.queryByTestId("discount-percentage")
		const effectivePrice = screen.queryByTestId("effective-price")

		expect(originalPrice).toBeInTheDocument()
		expect(discountPercentage).toBeInTheDocument()
		expect(effectivePrice).toBeInTheDocument()
	})
	test("with stock, do not render out of stock badge", () => {
		renderComponent({ product: placeholder_product_in_stock })

		const outOfStockBadge = screen.queryByText(/hết hàng/i)
		expect(outOfStockBadge).toBeNull()
	})
	test("with no stock, render out of stock badge", () => {
		renderComponent({ product: placeholder_product_out_of_stock })
		const outOfStockBadge = screen.queryByText(/hết hàng/i)
		expect(outOfStockBadge).toBeInTheDocument()
	})

	test("show correct link url", async () => {
		// const product = placeholder_product_in_stock
		// renderComponent({ product: product })
		// const linkComp = screen.getByTestId(
		// 	`/products/${slugify(product.title)}-${product.id}`
		// )
		// expect(linkComp).toBeInTheDocument()
		// const linkComp = screen.getByRole("link", {
		// 	// name: `/products/${slugify(product.title)}-${product.id}`,
		// 	name: "/products/iphone-9-1",
		// })
		// const linkElement = screen.getByRole("link")
		// const user = userEvent.setup()
		// const productCard = screen.getByTestId("product-card")
		// user.click(productCard)
	})

	test("navigate with correct us", async () => {
		const product = placeholder_product_in_stock

		const {
			props: { router },
		} = renderComponent({
			product,
		})

		const user = userEvent.setup()
		const link = screen.getByTestId(`product-card`)

		user.click(link)
		await waitFor(() => {
			expect(router.push).toHaveBeenCalledWith("/products/iphone-9-1")
		})
	})
})

describe("test add-to-cart button", () => {
	test("renders add to cart button", () => {
		renderComponent()
		expect(screen.getByTestId("add-to-cart")).toBeInTheDocument()
		expect(screen.getByTestId("cart-icon")).toBeInTheDocument()
		expect(screen.queryByTestId("loading-icon")).toBeNull()
	})
	test("button is clickable when in  stock", () => {
		renderComponent({ product: placeholder_product_in_stock })
		const addToCartButton = screen.getByTestId("add-to-cart")
		expect(addToCartButton).not.toHaveAttribute("disabled")
	})
	test("disable button when out of stock", () => {
		renderComponent({ product: placeholder_product_out_of_stock })
		const addToCartButton = screen.getByTestId("add-to-cart")
		expect(addToCartButton).toHaveAttribute("disabled")
	})
	test("show loading icon when click", async () => {
		renderComponent({ product: placeholder_product_in_stock })
		const addToCartButton = screen.getByTestId("add-to-cart")
		const user = userEvent.setup()
		user.click(addToCartButton)
		// expect(screen.findByTestId("loading-icon")).toBeInTheDocument()
		await waitFor(() => {
			expect(screen.queryByTestId("loading-icon")).toBeInTheDocument()
		})
	})
})
