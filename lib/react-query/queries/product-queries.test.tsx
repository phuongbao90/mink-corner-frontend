import { renderHook, waitFor } from "@testing-library/react"
import { createReactQueryWrapper } from "mocks/helpers/react-query-wrapper"
import { useGetProducts } from "./product-queries"

test("useGetProductQuery", async () => {
	const { result } = renderHook(() => useGetProducts(), {
		wrapper: createReactQueryWrapper(),
	})

	expect(result.current.isFetching).toBe(true)
	expect(result.current.isSuccess).toBe(false)

	await waitFor(() => expect(result.current.data).toBeDefined())
	await waitFor(() => expect(result.current.data?.total).toBe(100))
	await waitFor(() => expect(result.current.isFetching).toBe(false))
	await waitFor(() => expect(result.current.isSuccess).toBe(true))
})
