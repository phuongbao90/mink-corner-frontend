import { FC, useState } from "react"
import s from "./ProductCard.module.css"
import Image from "next/image"
import Link from "next/link"
import { slugify } from "@/utils"
import { useRouter } from "next/router"
import { Loader, ShoppingCart } from "react-feather"
import { directusLoader } from "@/components"
import { usePrice } from "@/hooks"
import { Product } from "@/features"

type Props = {
	product: Product
}

const ProductCard: FC<Props> = ({ product }) => {
	const [isLoading, setIsLoading] = useState(false)
	const {
		originalPrice,
		effectivePrice,
		discountPercentage,
		discountAmount,
		isDiscounted,
	} = usePrice(product)

	const isOutOfStock = product.stock <= 0
	const router = useRouter()

	return (
		<div
			data-testid="product-card"
			className="max-w-sm"
			onClick={() => router.push(`/products/${product.slug}`)}
		>
			{/* <Link
				href={`/products/${slugify(product.title)}-${product.id}`}
				data-testid={`/products/${slugify(product.title)}-${product.id}`}
			> */}
			<div className="relative aspect-square">
				<Image
					loader={directusLoader}
					alt="product-image"
					src={product.cover_image.id}
					fill
					style={{
						objectFit: "contain",
					}}
				/>
			</div>
			<div>
				<h3>{product.name}</h3>
				<div className="flex flex-row align-middle">
					{/* <span className="mr-8">{product.brand}</span> */}
					{/* <span>{product.category}</span> */}
				</div>
				<div>
					<span data-testid="effective-price" className="mr-8">
						{effectivePrice}
					</span>
					{isDiscounted ? (
						<span data-testid="discount-percentage">{discountPercentage}%</span>
					) : null}
				</div>
				{isDiscounted ? (
					<div>
						<span data-testid="original-price">{originalPrice}</span>
					</div>
				) : null}

				{isOutOfStock ? <span>hết hàng</span> : null}
			</div>
			<div>
				<button
					data-testid="add-to-cart"
					disabled={isOutOfStock ? true : false}
					onClick={(e) => {
						e.stopPropagation()
						setIsLoading(true)
					}}
				>
					{isLoading ? (
						<Loader data-testid="loading-icon" />
					) : (
						<ShoppingCart data-testid="cart-icon" />
					)}
				</button>
			</div>
			{/* </Link> */}
		</div>
	)
}

export default ProductCard
