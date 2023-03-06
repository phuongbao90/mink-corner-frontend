import React, { FC, PropsWithChildren } from "react"
import clsx from "clsx"
import Image from "next/image"
import BannerImage1 from "/public/images/banner-1.jpeg"
import BannerImage2 from "/public/images/banner-2.jpg"
import BannerImage3 from "/public/images/banner-3.jpg"
import { Box, Grid } from "@mantine/core"
import { ProductImage } from "@/components/UI"

type GridItemProps = {
	cols: number
	rows?: number
	children: React.ReactNode
}

const GridBanner = () => {
	return (
		<Box sx={{ borderWidth: 2, position: "relative" }}>
			<Grid sx={{ backgroundColor: "green" }} mih={700}>
				<Grid.Col span={7}></Grid.Col>
				<Grid.Col span={5} sx={{ backgroundColor: "yellow" }}>
					<Box
						sx={{
							position: "relative",
							backgroundColor: "red",
							width: "100%",
							height: "100%",
						}}
					>
						<Image
							alt="Banner Image 03"
							src={BannerImage2}
							priority
							fill
							style={{ objectFit: "cover" }}
						/>
					</Box>
				</Grid.Col>
			</Grid>
		</Box>
	)
}

export { GridBanner }
