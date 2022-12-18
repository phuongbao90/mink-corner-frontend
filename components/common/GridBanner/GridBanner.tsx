import React, { FC, PropsWithChildren } from "react"
import clsx from "clsx"
import Image from "next/image"
import BannerImage1 from "../../../public/images/banner-1.jpeg"
import BannerImage2 from "../../../public/images/banner-2.jpg"
import BannerImage3 from "../../../public/images/banner-3.jpg"

type GridItemProps = {
	cols: number
	rows?: number
	children: React.ReactNode
}

const GridItem = ({ cols = 1, rows = 1, children }: GridItemProps) => {
	return (
		<div
			className={`col-span-${cols} bg-red-200
			border-collapse border-black border-2 h-${60 * rows}`}
		>
			{children}
		</div>
	)
}

const GridBanner = () => {
	const defaultClassNamne = `bg-red-200 border-collapse border-black border-2 relative`

	return (
		<div className="grid grid-cols-12 grid-rows-2 gap-0 border-collapse border-black border-2 h-5/6">
			<div className={clsx(defaultClassNamne, "col-span-2 h-full row-span-1")}>
				<Image
					alt="Banner Image 01"
					src={BannerImage1}
					priority
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className={clsx(defaultClassNamne, "col-span-5 h-full row-span-1")}>
				2
			</div>
			<div className={clsx(defaultClassNamne, "col-span-5 row-span-2")}>
				<Image
					alt="Banner Image 02"
					src={BannerImage2}
					priority
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className={clsx(defaultClassNamne, "col-span-3 h-full row-span-1")}>
				4
			</div>
			<div className={clsx(defaultClassNamne, "col-span-3 h-full row-span-1")}>
				<Image
					alt="Banner Image 03"
					src={BannerImage3}
					priority
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className={clsx(defaultClassNamne, "col-span-1 h-full row-span-1")}>
				6
			</div>
		</div>
	)
}

export { GridBanner }
