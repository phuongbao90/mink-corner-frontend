import { TFeaturedProducts } from "./products.types"
import { apiRoutes } from "@/constant"
import { FetchOptionsType } from "@/features/collections"
import { Color, Product, Size } from "@/features/products/products.types"
import { fetcher } from "@/services"
import { validateEnable } from "@/utils"
import {
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query"

export const productKeys = {
	all: [{ scope: "product" }],
	list: (options = {}) => [{ scope: "product", type: "list", ...options }],
	detail: (slug: string | undefined) => [
		{ scope: "product", type: "detail", slug },
	],
	count: (options = {}) => [{ scope: "product", type: "count", ...options }],
	latest_products: () => [{ scope: "product", type: "latest-products" }],
	discounted_products: (options = {}) => [
		{ scope: "product", type: "latest-products", ...options },
	],
}

export async function getColors() {
	return await fetcher<Color[]>({ url: apiRoutes.colors })
}

export function useGetColors() {
	return useQuery({
		queryKey: [{ scope: "colors" }],
		queryFn: getColors,
	})
}

export function useGetSizes() {
	return useQuery({
		queryKey: [{ scope: "sizes" }, apiRoutes.sizes],
		queryFn: () => fetcher<Size[]>({ url: apiRoutes.sizes }),
	})
}

export function useGetProducts(options?: any) {
	const queryClient = useQueryClient()
	return useQuery({
		queryKey: productKeys.list(options),
		queryFn: async () => {
			const products = await fetcher<Product[]>({
				url: apiRoutes.products,
				params: options,
			})

			if (products) {
				products.forEach((product) => {
					queryClient.setQueryData(productKeys.detail(product.slug), product)
				})
			}

			return products
		},
	})
}

export function useGetFilteredProducts(options: FetchOptionsType | undefined) {
	const queryClient = useQueryClient()
	return useQuery({
		queryKey: productKeys.list(options),
		queryFn: async () => {
			const products = await fetcher<Product[]>({
				url: apiRoutes.products,
				params: options,
			})

			products?.forEach((product) => {
				queryClient.setQueryData(productKeys.detail(product.slug), product)
			})

			return products
		},
		retry: false,
		enabled: !!options,
	})
}

export function useGetInfiniteProducts(options: FetchOptionsType | undefined) {
	const queryClient = useQueryClient()

	return useInfiniteQuery({
		queryKey: productKeys.discounted_products(options),
		queryFn: async ({ pageParam = 1 }) => {
			const products = await fetcher<Product[]>({
				url: apiRoutes.products,
				params: { ...options, page: pageParam },
			})

			products?.forEach((product) => {
				queryClient.setQueryData(productKeys.detail(product.slug), product)
			})

			return {
				products,
				next_page: pageParam + 1,
			}
		},
		getNextPageParam: (lastPage, pages) => {
			if ((lastPage?.products?.length || 0) < (options?.limit || 12))
				return undefined
			return lastPage.next_page
		},
		enabled: !!options,
	})
}

export async function getLatestProducts() {
	return await fetcher<Product[]>({
		url: apiRoutes.products,
		params: {
			limit: 12,
			page: 1,
			sort: "-date_created",
			filter: {
				status: { _eq: "published" },
			},
		},
	})
}

export function useGetLatestProducts() {
	const queryClient = useQueryClient()
	return useQuery({
		queryKey: productKeys.latest_products(),
		queryFn: async () => {
			const products = await getLatestProducts()

			products?.forEach((product) => {
				queryClient.setQueryData(productKeys.detail(product.slug), product)
			})

			return products
		},
		retry: false,
	})
}

export function useGetProduct(slug: string | undefined) {
	return useQuery({
		queryKey: productKeys.detail(slug),
		queryFn: () =>
			fetcher<Product>({
				url: apiRoutes.product,
				params: { slug },
			}),
		enabled: validateEnable(slug),
	})
}
export function useGetFeaturedProducts() {
	return useQuery({
		queryKey: [{ scope: "product", type: "featured_products" }],
		queryFn: () =>
			fetcher<TFeaturedProducts>({
				url: apiRoutes.featured_products,
			}),
	})
}

export function useCountProducts(options: FetchOptionsType) {
	return useQuery({
		queryKey: productKeys.count(options),
		queryFn: () =>
			fetcher<number>({
				url: apiRoutes.product_count,
				params: options,
			}),
	})
}
