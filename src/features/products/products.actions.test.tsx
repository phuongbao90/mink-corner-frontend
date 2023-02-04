import { renderHook, waitFor } from "@testing-library/react"
import { createReactQueryWrapper } from "@/mocks/helpers"
import { useGetProductBySlug, useGetProducts } from "@/features"

describe("query product hooks", () => {
	test("useGetProducts", async () => {
		const { result } = renderHook(() => useGetProducts(), {
			wrapper: createReactQueryWrapper(),
		})

		await waitFor(() => expect(result.current.isSuccess).toBe(true))
		waitFor(() => expect(result.current.data).toHaveLength(3))
	})

	test("useGetProduct - given correct slug -> return product", async () => {
		const { result } = renderHook(() => useGetProductBySlug("nhan-canh-hoa"), {
			wrapper: createReactQueryWrapper(),
		})

		await waitFor(() => expect(result.current.isSuccess).toBe(true))
		expect(result.current.data?.slug).toBe("nhan-canh-hoa")
	})
	test("useGetProduct - given incorrect slug -> return error", async () => {
		const { result } = renderHook(
			() => useGetProductBySlug("nhan-canh-hoaZZZZZZZ"),
			{
				wrapper: createReactQueryWrapper(),
			}
		)

		await waitFor(() => expect(result.current.isError).toBe(true))
		expect(result.current.error).toBeDefined()
	})
})
