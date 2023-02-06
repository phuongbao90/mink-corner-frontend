import clsx from "clsx"

import { capitalize } from "lodash"
import { VariationType } from "@/pages/products/hooks/use-get-product-variation"
import { ProductItem } from "@/features"

const ProductVariation = ({
	variants,
	selectProductVariant,
}: {
	variants: VariationType
	selectProductVariant: (props: ProductItem) => void
}) => {
	return variants.label ? (
		<div className="flex pb-4 align-baseline">
			<span className="mr-4">{variants.label}</span>
			<div>
				{variants?.values?.map((productVariant, index) => (
					<button
						key={index}
						className={clsx(
							"w-8 h-8 mr-2 rounded-full cursor-pointer sm:mr-6",
							productVariant.isSelected && "text-red-600"
						)}
						onClick={() => selectProductVariant(productVariant)}
						data-testid={`select-variant-button-${index}`}
					>
						{capitalize(productVariant.variant?.value)}
					</button>
				))}
			</div>
		</div>
	) : null
}

export default ProductVariation
