import { IconImage } from "@/components/UI"
import { Box, rem } from "@mantine/core"
import { ReactNode } from "react"

const OUTLINE_WIDTH = 1
const RADIUS = 4

export const CarouselThumbnails = ({ children }: { children: ReactNode }) => {
	return (
		<Box
			p={2}
			mt={rem(8)}
			sx={{
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
			sx={(theme) => ({
				aspectRatio: "0.8",
				position: "relative",
				cursor: "pointer",
				overflow: "hidden",
				//
				outlineColor: "#000",
				outlineStyle: "solid",
				outlineWidth: active ? OUTLINE_WIDTH : 0,
				//
				borderWidth: rem(4),
				borderRadius: RADIUS,
				borderColor: "#fff",
				borderStyle: "solid",
				opacity: active ? 1 : 0.7,
				width: 55,
				[theme.fn.largerThan("xs")]: {
					width: 75,
				},
			})}
			onClick={onClick}
		>
			<IconImage
				src={file_id}
				alt="Thumbnail"
				style={{ objectFit: "cover", borderRadius: RADIUS }}
				fill
				sizes="10vw"
			/>
		</Box>
	)
}
