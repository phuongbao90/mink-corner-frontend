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
			sx={(theme) => ({
				width: active ? 32 : 18,
				height: 4,
				marginRight: 10,
				backgroundColor: active ? theme.colors.brown[5] : theme.colors.brown[2],
				borderRadius: 8,
				cursor: "pointer",
			})}
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
