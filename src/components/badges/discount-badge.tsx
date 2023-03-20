import { Badge, BadgeProps, Box, Text, BoxProps } from "@mantine/core"
import { Gift } from "react-feather"

export const DiscountBadge = ({
	discountAmount,
	badgeProps,
	wrapperProps,
}: {
	discountAmount?: string
	badgeProps?: BadgeProps
	wrapperProps?: BoxProps
}) => {
	return (
		<Box {...wrapperProps}>
			<Badge
				c="#fff"
				sx={(theme) => ({
					alignItems: "baseline",
					fontSize: 11,

					[theme.fn.largerThan("xs")]: {
						fontSize: 12,
					},
				})}
				variant="filled"
				color="red"
				leftSection={<Gift size={11} />}
				// rightSection={<Text span>{discountAmount}</Text>}
				{...badgeProps}
			>
				<Text>sale</Text>
			</Badge>
		</Box>
	)
}
