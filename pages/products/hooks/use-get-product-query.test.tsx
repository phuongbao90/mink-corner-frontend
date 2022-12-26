import { render, screen, renderHook, waitFor } from "@testing-library/react"
import { createReactQueryWrapper } from "mocks/helpers"
import { useGetProductQuery } from "./use-get-product-query"

describe("useGetProductQuery", () => {
	test("received data if product exist", async () => {
		const { result } = renderHook(() => useGetProductQuery(1), {
			wrapper: createReactQueryWrapper(),
		})

		expect(result.current.data).toBeUndefined()
		expect(result.current.isLoading).toBeTruthy()

		await waitFor(() => expect(result.current.isSuccess).toBe(true))
		expect(result.current.data).toBeDefined()
	})
	test("received no data if product id doesnt exist", async () => {
		const { result } = renderHook(() => useGetProductQuery(31), {
			wrapper: createReactQueryWrapper(),
		})

		expect(result.current.data).toBeUndefined()
		expect(result.current.isLoading).toBeTruthy()

		await waitFor(() => expect(result.current.isError).toBe(true))
		expect(result.current.data).toBeUndefined()
	})
})
