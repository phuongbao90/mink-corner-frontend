import { ActionIcon, CSSObject, Group, NumberInput, Sx } from "@mantine/core"

type Props = {
	currentValue: number
	handleUpdateQuantity: (nextQuantity: number) => void
	size?: "sm" | "md"
	isLoading?: boolean
	buttonPropStyles?: Sx
	inputPropStyles?: Sx
	containerPropsStyles?: Sx
}

const mappedSize = {
	actionIcon: {
		sm: 28,
		md: 36,
	},
	numberInput_width: {
		sm: 46,
		md: 58,
	},
	numberInput_height: {
		sm: 28,
		md: 36,
	},
	numberInput_fontSize: {
		sm: 12,
		md: 18,
	},
} as const

export const QuantityInput = ({
	currentValue,
	handleUpdateQuantity,
	size = "md",
	isLoading,
	containerPropsStyles,
	inputPropStyles,
	buttonPropStyles,
}: Props) => {
	return (
		<Group
			spacing={0}
			sx={{
				...(containerPropsStyles || {}),
			}}
		>
			<ActionIcon
				size={mappedSize.actionIcon[size]}
				variant="default"
				onClick={() => handleUpdateQuantity(currentValue - 1)}
				sx={{
					borderRadius: 0,
					borderRightWidth: 0,
					...buttonPropStyles,
				}}
				disabled={isLoading}
			>
				–
			</ActionIcon>

			<NumberInput
				hideControls
				value={currentValue}
				onChange={(val) => handleUpdateQuantity(Number(val))}
				step={1}
				styles={{
					input: {
						width: mappedSize.numberInput_width[size],
						textAlign: "center",
						borderCollapse: "collapse",
						borderRadius: 0,
						height: mappedSize.numberInput_height[size],
						minHeight: mappedSize.numberInput_height[size],
						fontSize: mappedSize.numberInput_fontSize[size],
						...inputPropStyles,
					},
				}}
			/>

			<ActionIcon
				size={mappedSize.actionIcon[size]}
				variant="default"
				onClick={() => handleUpdateQuantity(currentValue + 1)}
				sx={{
					borderRadius: 0,
					borderLeftWidth: 0,
					...buttonPropStyles,
				}}
				disabled={isLoading}
			>
				+
			</ActionIcon>
		</Group>
	)
}
