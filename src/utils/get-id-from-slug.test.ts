import { getIdFromSlug } from "./get-id-from-slug"

describe("getIdFromSlug", () => {
	it("return number from valid slug", () => {
		const result = getIdFromSlug("iphone-9-1")
		expect(result).toBe(1)
	})
	it("return NaN from invalid slug", () => {
		const result = getIdFromSlug("iphone-9-asd")
		expect(result).toBe(NaN)
	})
})
