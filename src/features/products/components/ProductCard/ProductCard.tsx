import { useProductState } from "@/store/context/product-context"
import { DirectusImage } from "@/components/UI"
import { useRouter } from "next/router"

export const ProductCardTemplate = () => {
	const router = useRouter()
	const { product, options } = useProductState()

	if (!product) return null

	return (
		<div data-testid="product-card" className="max-w-sm">
			<div
				className="relative cursor-pointer aspect-square"
				onClick={() => router.push(`/products/${product.slug}`)}
			>
				<DirectusImage src={product?.cover_image?.id} alt="product-image" />
			</div>
			<div>
				<h3
					className="cursor-pointer"
					onClick={() => router.push(`/products/${product.slug}`)}
				>
					{product.name}
				</h3>
				<div className="flex flex-row align-middle">
					<span>{product.category.category_name}</span>
				</div>
				{/* <div>
					<span data-testid="effective-price" className="mr-8">
						{formatCurrency(effectivePrice)}
					</span>
					{isDiscounted ? (
						<span data-testid="discount-percentage">{discountPercentage}%</span>
					) : null}
				</div> */}
				{/* {isDiscounted ? (
					<div>
						<span data-testid="original-price">{originalPrice}</span>
					</div>
				) : null} */}

				{/* {isOutOfStock ? <span>hết hàng</span> : null} */}
			</div>
		</div>
	)
}
