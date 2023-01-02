import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { NextButton, PrevButton } from "./CarouselButton"
// import "./ProductImageCarousel.module.css"

type Props = {
	images: string[] | undefined
}

const ProductImageCarousel = ({ images }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, speed: 20 })
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
	const [activeId, setActiveId] = useState(0)

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	)
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	)

	const onSelect = useCallback(() => {
		if (!emblaApi) return
		setActiveId(emblaApi.selectedScrollSnap())
		setPrevBtnEnabled(emblaApi.canScrollPrev())
		setNextBtnEnabled(emblaApi.canScrollNext())
	}, [emblaApi])

	useEffect(() => {
		if (!emblaApi) return
		onSelect()
		emblaApi.on("select", onSelect)
		emblaApi.on("reInit", onSelect)
	}, [emblaApi, onSelect])

	if (!images) {
		return <div>no image available</div>
	}

	return (
		<div className="relative overflow-hidden" ref={emblaRef}>
			<div className="flex">
				{images.map((url, index) => (
					<div
						key={index}
						className="relative aspect-square grow-0 shrink-0 basis-full"
						data-testid={activeId === index && `active-slide-${index}`}
					>
						<Image
							fill
							src={url}
							alt="product-image"
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
