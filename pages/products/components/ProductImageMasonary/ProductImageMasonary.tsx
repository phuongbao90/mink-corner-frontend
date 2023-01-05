import clsx from "clsx"
import Image from "next/image"

type Props = {
	images: string[] | undefined
}

const ProductImageMasonary = ({ images }: Props) => {
	if (!images) return null

	return (
		<div className="hidden grid-cols-4 gap-2 sm:grid">
			{images.map((url, index) => (
				<div
					className={clsx({
						"relative aspect-square": true,
						"col-span-2": index === 0 || index === 1,
						"col-span-1": index !== 0 && index !== 1,
					})}
					key={index}
				>
					<Image
						fill
						src={url}
						alt="product-image"
						style={{ objectFit: "cover" }}
					/>
				</div>
			))}
		</div>
	)
}
export default ProductImageMasonary
