import { ActionIcon } from "@mantine/core"
import { ChevronLeft, ChevronRight } from "react-feather"

type ButtonProps = {
	isHovering: boolean
	enabled: boolean
	onClick: () => void
}

export const CarouselNextArrow = ({
	isHovering,
	enabled,
	onClick,
}: ButtonProps) => {
	return (
		<ActionIcon
			sx={{
				backgroundColor: !isHovering ? "rgba(255, 255, 255, .15)" : "#f8f9fa",
				borderRadius: "50%",
				borderColor: !isHovering ? "#fafafa" : "#e2e2e21a",
				color: !isHovering ? "#fff" : "#000",
				"&:hover": {
					color: "#000",
					backgroundColor: "#f8f9fa",
					borderColor: "#c5c6d0",
				},
			}}
			w={45}
			h={45}
			variant="transparent"
			disabled={!enabled}
			onClick={onClick}
		>
			<ChevronRight size={30} />
		</ActionIcon>
	)
}
export const CarouselPrevArrow = ({
	isHovering,
	enabled,
	onClick,
}: ButtonProps) => {
	return (
		<ActionIcon
			sx={{
				backgroundColor: !isHovering ? "rgba(255, 255, 255, .15)" : "#f8f9fa",
				borderRadius: "50%",
				borderColor: !isHovering ? "#fafafa" : "#e2e2e21a",
				color: !isHovering ? "#fff" : "#000",
				"&:hover": {
					color: "#000",
					backgroundColor: "#f8f9fa",
					borderColor: "#c5c6d0",
				},
			}}
			w={45}
			h={45}
			variant="transparent"
			disabled={!enabled}
			onClick={onClick}
		>
			<ChevronLeft size={30} />
		</ActionIcon>
	)
}
