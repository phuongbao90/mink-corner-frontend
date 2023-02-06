import { useRouter } from "next/router"
import ProductImageCarousel from "./components/ProductImageCarousel"
import ProductImageMasonary from "./components/ProductImageMasonary"
import { ProductInfo } from "./ProductInfo"
import { GetStaticPaths, GetStaticProps } from "next"
import { dehydrate, QueryClient } from "@tanstack/react-query"
import ProductVariation from "./components/ProductVariation"
import { useGetProductVariation } from "./hooks/use-get-product-variation"
import { useEffect, useRef } from "react"
import { capitalize, isEmpty } from "lodash"
import { Toast, ToastProps } from "@/components"
import React, { useState } from "react"
import {
	useAddCartItemMutation,
	useGetUser,
	useGetCart,
	useGetProductBySlug,
	productKeys,
} from "@/features"
import { getProduct, getProductSlugs } from "@/services"

function ProductDetailPage() {
	let {
		query: { slug },
	} = useRouter()

	const [quantityPurchase, setQuantityPurchase] = useState(1)
	const {
		data: product,
		isSuccess,
		isError,
	} = useGetProductBySlug(typeof slug === "string" ? slug : undefined)

	const { data: user } = useGetUser()

	const cartId = user?.cart?.[0]?.id

	const { data: cart } = useGetCart(cartId)
	const addCartItemMutation = useAddCartItemMutation(cart?.id)

	const { variants, selectProductVariant, selectedProductVariant } =
		useGetProductVariation(product)

	const toastRef = useRef<ToastProps>()

	useEffect(() => {
		if (!variants || isEmpty(variants) || selectedProductVariant) return
		const firstProductVariant = variants.values?.[0]

		selectProductVariant(firstProductVariant)
	}, [variants, selectedProductVariant])

	if (isSuccess) {
		return (
			<div className="flex flex-col sm:flex-row">
				<div className="sm:w-7/12">
					<div className="sm:hidden">
						<ProductImageCarousel
							product={product}
							selectedProductVariant={selectedProductVariant}
						/>
					</div>

					<div className="hidden sm:block">
						<ProductImageMasonary
							product={product}
							selectedProductVariant={selectedProductVariant}
						/>
					</div>
				</div>
				<div className="sm:w-5/12">
					<div>
						<h2>{capitalize(product?.category?.category_name)}</h2>
					</div>
					<div className="fixed bottom-0 w-full px-4 pt-2 pb-6 bg-gray-300 sm:static sm:bg-transparent">
						<div className="flex justify-between pb-6 sm:flex-col">
							<h1>{capitalize(product?.name)}</h1>
							{selectedProductVariant && (
								<div>{selectedProductVariant?.price}</div>
							)}
						</div>
						<ProductVariation
							variants={variants}
							selectProductVariant={selectProductVariant}
						/>
						<div>
							<div className="flex">
								<span>Số lượng</span>
								<div>
									<input
										value={quantityPurchase}
										onChange={(e) => setQuantityPurchase(+e.target.value)}
										className="text-center border-2"
										type="number"
									/>
								</div>
							</div>
						</div>
						<div>
							<button
								className="w-full bg-red-300 disabled:bg-slate-500"
								title="Nút mua hàng"
								disabled={addCartItemMutation.isLoading}
								onClick={() => {
									if (cart?.id && selectedProductVariant?.id) {
										addCartItemMutation.mutate(
											{
												cart_id: cart?.id,
												product_item_id: Number(selectedProductVariant.id),
												quantity: Number(quantityPurchase),
											},
											{
												onSuccess: async () => {
													toastRef.current?.open()
												},
												onSettled: async (data, error, variables, context) => {
													toastRef.current?.open()
												},
											}
										)
									}
								}}
							>
								Mua ngay
							</button>
						</div>
					</div>
					<ProductInfo product={product} />
				</div>

				<Toast
					ref={toastRef}
					title="Thông báo"
					description="Đã thêm sản phẩm vào giỏ hàng"
				/>
			</div>
		)
	}

	if (isError) {
		return <div>Rất tiếc sản phầm này không tồn tại.</div>
	}

	return <div>loading</div>
}

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = await getProductSlugs()
	const paths = slugs.map((slug) => ({
		params: { slug },
	}))

	return {
		paths,
		fallback: "blocking",
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const queryClient = new QueryClient()
	const { params } = context
	const { slug } = params || {}

	if (!slug || typeof slug !== "string") return { notFound: true }

	try {
		await queryClient.fetchQuery(productKeys.detail(slug), () =>
			getProduct(slug)
		)
	} catch (error) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
		revalidate: 60,
	}
}

export default ProductDetailPage
