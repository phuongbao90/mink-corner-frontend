import {
	CarouselDot,
	CarouselDots,
	CarouselNextArrow,
	CarouselPrevArrow,
	CarouselThumbnail,
	CarouselThumbnails,
} from "@/components/carousel"
import { IconImage } from "@/components/UI"
import { Box, Flex } from "@mantine/core"
import { useDebouncedValue, useHover } from "@mantine/hooks"
import { EmblaOptionsType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import React, {
	Fragment,
	ReactElement,
	ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react"

const OPTIONS: EmblaOptionsType = {
	loop: true,
	align: "start",
	slidesToScroll: 1,
}

type CarouselProps = {
	carouselOptions?: EmblaOptionsType
	slides: unknown[]
	autoplay?: boolean
	children: ReactElement[] | ReactNode[]
	withArrows?: boolean
	withDots?: boolean
	withThumbnails?: boolean
}

export function CarouselWrapper({
	carouselOptions = {},
	slides,
	autoplay = false,
	children,
	withArrows = false,
	withDots = false,
	withThumbnails = false,
}: CarouselProps) {
	const { hovered, ref: hoverRef } = useHover()
	const [debouncedHover] = useDebouncedValue(hovered, 200)
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ ...OPTIONS, ...carouselOptions },
		[
			Autoplay({
				playOnInit: autoplay,
			}),
		]
	)

	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState(0)

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	)
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	)

	const onSelect = useCallback(() => {
		if (!emblaApi || !slides) return

		setSelectedIndex(emblaApi.selectedScrollSnap())
		setPrevBtnEnabled(emblaApi.canScrollPrev())
		setNextBtnEnabled(emblaApi.canScrollNext())
	}, [emblaApi, slides?.length])

	useEffect(() => {
		if (!emblaApi || !slides) return
		onSelect()
		emblaApi.on("select", onSelect)
		emblaApi.on("reInit", onSelect)
	}, [emblaApi, onSelect, slides?.length])

	useEffect(() => {
		if (hovered) emblaApi?.plugins().autoplay?.stop()
	}, [hovered, emblaApi])

	const dots = React.Children.map(children, (_, index) => {
		return (
			<Fragment key={index}>
				<CarouselDot
					active={selectedIndex === index}
					onClick={() => emblaApi?.scrollTo(index)}
				/>
			</Fragment>
		)
	})
	const thumbnails = React.Children.map(children, (_, index) => {
		return (
			<CarouselThumbnail
				file_id={String(slides?.[index])}
				active={selectedIndex === index}
				onClick={() => emblaApi?.scrollTo(index)}
			/>
		)
	})

	return (
		<Box
			ref={hoverRef}
			sx={{
				overflow: "hidden",
				paddingBottom: withThumbnails ? 85 : 0,
			}}
		>
			<Box ref={slides ? emblaRef : null} sx={{ position: "relative" }}>
				<Flex>{children}</Flex>
				{withArrows && (
					<>
						<Box
							sx={(theme) => ({
								position: "absolute",
								left: "5%",
								top: "50%",
								transform: "translate(-50%, -50%)",
								[theme.fn.smallerThan("xs")]: {
									display: "none",
								},
							})}
						>
							<CarouselPrevArrow
								isHovering={debouncedHover}
								enabled={prevBtnEnabled}
								onClick={scrollPrev}
							/>
						</Box>
						<Box
							sx={(theme) => ({
								position: "absolute",
								right: "2%",
								top: "50%",
								transform: "translate(-50%, -50%)",
								[theme.fn.smallerThan("xs")]: {
									display: "none",
								},
							})}
						>
							<CarouselNextArrow
								isHovering={debouncedHover}
								enabled={nextBtnEnabled}
								onClick={scrollNext}
							/>
						</Box>
					</>
				)}

				{withDots && <CarouselDots>{[dots]}</CarouselDots>}
				{withThumbnails && (
					<CarouselThumbnails>{[thumbnails]}</CarouselThumbnails>
				)}
			</Box>
		</Box>
	)
}
