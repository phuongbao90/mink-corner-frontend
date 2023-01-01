import { getIdFromSlug } from "lib/utils"
import Image from "next/image"
import { useRouter } from "next/router"
import { useGetProductQuery } from "./hooks/use-get-product-query"
import ProductImageCarousel from "./components/ProductImageCarousel"
import ProductImageMasonary from "./components/ProductImageMasonary"

function ProductDetailPage() {
	const router = useRouter()
	const { slug } = router.query
	const productId = getIdFromSlug(String(slug))
	const {
		data: product,
		error,
		isLoading,
		isSuccess,
	} = useGetProductQuery(productId)

	if (isLoading) {
		return <div>loading</div>
	}

	if (error instanceof Error) {
		return null
	}

	return (
		<div className="flex flex-row">
			<div className="w-7/12 bg-gray-200">
				<div className="sm:hidden">
					<ProductImageCarousel />
				</div>
				<div className="hidden sm:block">
					<ProductImageMasonary />
				</div>
			</div>
			<div className="w-5/12">
				<div>
					<h1>{product?.title}</h1>
				</div>

				<div>{product?.price}</div>
				<div>
					<span>{product?.brand}</span>
					<span>{product?.category}</span>
				</div>
			</div>
		</div>
	)
}

export default ProductDetailPage
