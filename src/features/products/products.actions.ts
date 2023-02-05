import { getProduct, getProducts } from "@/services"
import { validateEnable } from "@/utils"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const productKeys = {
	all: [{ scope: "product" }],
	list: (options = {}) => [{ scope: "product", type: "list", ...options }],
	detail: (slug: string | undefined) => [
		{ scope: "product", type: "detail", slug },
	],
}

export function useGetProducts(options?: any) {
	const queryClient = useQueryClient()
	return useQuery({
		queryKey: productKeys.list(options),
		queryFn: async () => {
			const products = await getProducts(options)

			if (products) {
				products.forEach((product) => {
					queryClient.setQueryData(productKeys.detail(product.slug), product)
				})
			}

			return products
		},
	})
}

export function useGetProductBySlug(slug: string | undefined) {
	return useQuery({
		queryKey: productKeys.detail(slug),
		queryFn: () => getProduct(String(slug)),
		enabled: validateEnable(slug),
	})
}
