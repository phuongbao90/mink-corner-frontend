import clsx from "clsx"
import { directusLoader } from "@/components"
import Image from "next/image"
import useGetProductImages from "../../hooks/use-get-product-images"
import { Product, ProductItem } from "@/features"

const ProductImageMasonary = ({
	product,
	selectedProductVariant,
}: {
	product: Product
	selectedProductVariant: ProductItem | null
}) => {
	const { images } = useGetProductImages(product, selectedProductVariant)

	if (!images) return null

	return (
		<div className="grid grid-cols-4 gap-2 ">
			{images.map(({ directus_files_id }, index) => (
				<div
					className={clsx({
						"relative aspect-square": true,
						"col-span-2": index === 0 || index === 1,
						"col-span-1": index !== 0 && index !== 1,
					})}
					key={index}
				>
					<Image
						loader={directusLoader}
						fill
						src={directus_files_id.id}
						alt="product-image-masonary"
						style={{ objectFit: "cover" }}
					/>
				</div>
			))}
		</div>
	)
}

export default ProductImageMasonary
