import { act, waitForElementToBeRemoved, within } from "@testing-library/react"
import { renderAppWrapper } from "@/mocks/helpers"
import { createMockRouter } from "@/mocks/helpers/create-mock-router"
import userEvent from "@testing-library/user-event"
import CartPage from "./index.page"

describe("INTEGRATION TEST: cart page", () => {
	test("render correctly", async () => {
		// const mockUserId = process.env.USER_ID
		// window.localStorage.setItem("user_id", String(mockUserId))
		const router = createMockRouter({
			pathname: "/cart",
		})
		const result = renderAppWrapper(<CartPage />, { router })

		// initially render loading text
		expect(result.getByText(/loading/i)).toBeInTheDocument()

		// successfully load cart
		expect(
			await result.findByRole("heading", {
				level: 1,
				name: /Giỏ hàng của bạn/i,
			})
		)

		result.getByText(/bạn đang có 2 sản phẩm trong giỏ hàng/i)
		result.getByText(/669000/i)
		result.getByRole("button", {
			name: /thanh toán/i,
		})

		const cartList = result.getByRole("list", {
			name: "cart-list",
		})

		// assert 2 cart items rendered
		const cartItems = within(cartList).getAllByRole("listitem")
		expect(cartItems.length).toBe(2)

		// When user click delete button - 1 cart item removed
		const deleteButton = within(
			result.getByRole("listitem", { name: "cart-item-0" })
		).getByRole("button", {
			name: "delete-button",
		})

		const user = userEvent.setup()
		act(() => {
			user.click(deleteButton)
		})

		const removedElement = result.queryByRole("listitem", {
			name: "cart-item-0",
		})

		await waitForElementToBeRemoved(removedElement)
	})
})
