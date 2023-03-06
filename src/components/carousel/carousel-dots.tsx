import { Box } from "@mantine/core"
import { ReactNode } from "react"

export function CarouselDot({
	active = false,
	onClick,
}: {
	active: boolean
	onClick: () => void
}) {
	return (
		<Box
			sx={{
				width: active ? 36 : 20,
				height: 4,
				marginRight: 12,
				backgroundColor: "#eaeaea",
				borderRadius: 8,
				cursor: "pointer",
			}}
			onClick={onClick}
		></Box>
	)
}
export function CarouselDots({ children }: { children: ReactNode }) {
	return (
		<Box
			sx={{
				position: "absolute",
				bottom: "5%",
				left: 0,
				right: 0,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{children}
		</Box>
	)
}
