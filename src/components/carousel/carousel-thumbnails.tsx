import { IconImage } from "@/components/UI"
import { Box } from "@mantine/core"
import { ReactNode } from "react"

const OUTLINE_WIDTH = 1
const RADIUS = 4

export const CarouselThumbnails = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			sx={{
				position: "absolute",
				bottom: -85 + OUTLINE_WIDTH * 2,
				left: OUTLINE_WIDTH * 2,
				right: 0,
				display: "flex",
				alignItems: "center",
			}}
		>
			{children}
		</Box>
	)
}
export const CarouselThumbnail = ({
	file_id,
	active,
	onClick,
}: {
	file_id: string
	active: boolean
	onClick: () => void
}) => {
	return (
		<Box
			sx={{
				width: 55,
				aspectRatio: "0.8",
				position: "relative",
				cursor: "pointer",
				overflow: "hidden",
				//
				outlineColor: "#000",
				outlineStyle: "solid",
				outlineWidth: active ? OUTLINE_WIDTH : 0,
				//
				borderWidth: 2,
				borderRadius: RADIUS,
				borderColor: "#fff",
				borderStyle: "solid",
				opacity: active ? 1 : 0.7,
			}}
			mr="sm"
			onClick={onClick}
		>
			<IconImage
				src={file_id}
				alt="Thumbnail"
				style={{ objectFit: "cover", borderRadius: RADIUS }}
				fill
				sizes="5vw"
			/>
		</Box>
	)
}
