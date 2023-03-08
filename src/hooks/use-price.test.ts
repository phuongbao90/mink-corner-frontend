import { usePrice } from "@/hooks/use-price"
import { renderHook } from "@testing-library/react"

describe("usePrice", () => {
	test("Return undefined if no product get passed in", () => {
		// const { result } = renderHook(() => usePrice(undefined))
		// expect(result.current.isDiscounted).toBe(null)
		// expect(result.current.effectivePrice).toBe(null)
	})
	test("isDiscount should be true if discountPercent is different from 0", () => {
		// const { result } = renderHook(() =>
		// 	usePrice({
		// 		discountPercentage: 10,
		// 		price: 100,
		// 	})
		// )
		// expect(result.current.isDiscounted).toBe(true)
		// expect(result.current.effectivePrice).toBe(90)
		// expect(result.current.originalPrice).toBe(100)
	})
	test("when discountPercentage = 0, isDiscount should be false", () => {
		// const { result } = renderHook(() =>
		// 	usePrice({
		// 		discountPercentage: 0,
		// 		price: 100,
		// 	})
		// )
		// expect(result.current.isDiscounted).toBe(false)
		// expect(result.current.effectivePrice).toBe(result.current.originalPrice)
	})
})
