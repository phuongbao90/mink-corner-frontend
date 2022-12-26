import { getIdFromSlug } from "lib/utils"
import Image from "next/image"
import { useRouter } from "next/router"
import { useGetProductQuery } from "./hooks/use-get-product-query"

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
		<div>
			<div>
				<h1>{product?.title}</h1>
			</div>

			<div>{product?.price}</div>
			<div>
				<span>{product?.brand}</span>
				<span>{product?.category}</span>
			</div>
		</div>
	)
}

export default ProductDetailPage
