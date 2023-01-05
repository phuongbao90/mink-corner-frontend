import { getIdFromSlug } from "lib/utils"
import { useRouter } from "next/router"
import { useGetProductQuery } from "./hooks/use-get-product-query"
import ProductImageCarousel from "./components/ProductImageCarousel"
import ProductImageMasonary from "./components/ProductImageMasonary"
import { ProductInfo } from "./ProductInfo"

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
		<div className="flex flex-col sm:flex-row">
			<div className="sm:w-7/12">
				<div className="sm:hidden">
					<ProductImageCarousel images={undefined ?? product?.images} />
				</div>

				<ProductImageMasonary images={undefined ?? product?.images} />
			</div>
			<div className="sm:w-5/12">
				<div>
					<span className="mr-4">{product?.brand}</span>
					<span>{product?.category}</span>
				</div>
				<div className="fixed bottom-0 w-full px-4 pt-2 pb-6 bg-gray-300 sm:static sm:bg-transparent">
					<div className="flex justify-between pb-6 sm:flex-col">
						<h1>{product?.title}</h1>
						<div>{product?.price}</div>
					</div>
					<div className="flex justify-between pb-4 align-middle sm:flex-col">
						<div className="flex align-middle">
							<span className="w-8 h-8 mr-2 bg-red-600 rounded-full cursor-pointer sm:mr-6"></span>
							<span className="w-8 h-8 mr-2 bg-blue-600 rounded-full cursor-pointer sm:mr-6"></span>
							<span className="w-8 h-8 mr-2 bg-green-600 rounded-full cursor-pointer sm:mr-6"></span>
							<span className="w-8 h-8 bg-black rounded-full cursor-pointer"></span>
						</div>
						<div className="flex align-middle sm:mt-4">
							<span className="mr-5 cursor-pointer sm:mr-8">S</span>
							<span className="mr-5 cursor-pointer sm:mr-8">M</span>
							<span className="mr-5 cursor-pointer sm:mr-8">L</span>
							<span className="cursor-pointer ">XL</span>
						</div>
					</div>
					<div>
						<button className="w-full bg-red-300" title="Nút mua hàng">
							Mua ngay
						</button>
					</div>
				</div>
				<ProductInfo />
			</div>
		</div>
	)
}

export default ProductDetailPage
