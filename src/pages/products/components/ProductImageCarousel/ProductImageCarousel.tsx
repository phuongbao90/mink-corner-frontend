import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { NextButton, PrevButton } from "./CarouselButton"
import { directusLoader } from "@/components"
import { Product, ProductItem } from "@/types"
import { isEmpty } from "lodash"
import useGetProductImages from "@/pages/products/hooks/use-get-product-images"

const ProductImageCarousel = ({
	product,
	selectedProductVariant,
}: {
	product: Product
	selectedProductVariant: ProductItem | null
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, speed: 20 })
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
	const [activeId, setActiveId] = useState(0)

	const { images } = useGetProductImages(product, selectedProductVariant)

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	)
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	)

	const onSelect = useCallback(() => {
		// if (!emblaApi || isEmpty(images)) return
		if (!emblaApi) return

		setActiveId(emblaApi.selectedScrollSnap())
		setPrevBtnEnabled(emblaApi.canScrollPrev())
		setNextBtnEnabled(emblaApi.canScrollNext())
	}, [emblaApi, images])

	useEffect(() => {
		// if (!emblaApi || isEmpty(images)) return
		if (!emblaApi) return
		onSelect()
		emblaApi.on("select", onSelect)
		emblaApi.on("reInit", onSelect)
	}, [emblaApi, onSelect, images])

	if (!images || isEmpty(images)) {
		return <div>no image available</div>
	}

	return (
		<div className="relative overflow-hidden" ref={emblaRef}>
			<div className="flex">
				{images.map(({ file }, index) => (
					<div
						key={index}
						className="relative aspect-square grow-0 shrink-0 basis-full"
						data-testid={activeId === index && `active-slide-${index}`}
					>
						<Image
							loader={directusLoader}
							fill
							src={file.id}
							alt="product-image-carousel"
							style={{
								objectFit: "contain",
							}}
						/>
					</div>
				))}
			</div>
			<PrevButton enabled={prevBtnEnabled} onClick={scrollPrev} />
			<NextButton enabled={nextBtnEnabled} onClick={scrollNext} />
		</div>
	)
}

export default ProductImageCarousel
