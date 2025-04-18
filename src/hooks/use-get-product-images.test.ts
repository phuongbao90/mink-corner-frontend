import { renderHook, waitFor } from "@testing-library/react"

import { placeholder_product } from "@/mocks/placeholders/placeholder-product-list"
import { Product, ProductItem } from "@/features/products"
import { placeholder_data } from "../mocks/placeholders/placeholder-data"
import { useGetProductImages } from "@/hooks/use-get-product-images"

describe("test useGetProductImages", () => {
	const productWithNoVariantImages = placeholder_data.product[0] // ao-len
	const productWithVariantImages = placeholder_data.product[1] // nhan-canh-hoa
	test("given product with not variant images, return 4 images", async () => {
		const { result } = renderHook(() =>
			useGetProductImages(productWithNoVariantImages as Product, null)
		)

		await waitFor(() => expect(result.current.images).toHaveLength(4))
		expect(result.current.images[0].directus_files_id.id).toBe(
			"fdc6ee8c-b676-4d61-9001-37b91720e2d2"
		)
		expect(result.current.images[1].directus_files_id.id).toBe(
			"af6be75f-17bc-4007-962d-83b766f477e1"
		)
		expect(result.current.images[2].directus_files_id.id).toBe(
			"383bbbc8-94a0-4b6e-9513-d58df2bf129f"
		)
		expect(result.current.images[3].directus_files_id.id).toBe(
			"c3835fc2-184c-46b4-be5f-8474298a5a2f"
		)
	})
	test("given product with variant images and no selected varian -> return empty array ", async () => {
		const { result } = renderHook(() =>
			useGetProductImages(productWithVariantImages as Product, null)
		)

		await waitFor(() => expect(result.current.images).toHaveLength(0))
	})
	test("given product with variant images and selected 1st variant -> return 5 images ", async () => {
		const { result } = renderHook(() =>
			useGetProductImages(
				productWithVariantImages as Product,
				productWithVariantImages.product_item[0] as ProductItem
			)
		)

		await waitFor(() => expect(result.current.images).toHaveLength(5))
	})
	test("given product with variant images and selected 2nd variant -> return 6 images ", async () => {
		const { result } = renderHook(() =>
			useGetProductImages(
				productWithVariantImages as Product,
				productWithVariantImages.product_item[1] as ProductItem
			)
		)

		await waitFor(() => expect(result.current.images).toHaveLength(6))
	})
})
