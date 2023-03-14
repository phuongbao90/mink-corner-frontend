import { NewReleaseBadge } from "@/components/badges"
import { useProductContext } from "@/components/product/ProductCard/product-card"
import dayjs from "dayjs"

export const ProductCardNewReleasedBadge = () => {
	const { product } = useProductContext()
	const isNewReleased =
		Math.abs(dayjs(product.date_created).diff(new Date(), "days")) <= 24

	if (isNewReleased) {
		return (
			<NewReleaseBadge
				wrapperProps={{
					sx: {
						position: "absolute",
						bottom: 6,
						left: 12,
					},
				}}
			/>
		)
	}

	return null
}
