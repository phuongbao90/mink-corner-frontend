import { Badge, BadgeProps, Box, Text, BoxProps } from "@mantine/core"

export const NewReleaseBadge = ({
	badgeProps,
	wrapperProps,
}: {
	badgeProps?: BadgeProps
	wrapperProps?: BoxProps
}) => {
	return (
		<Box {...wrapperProps}>
			<Badge
				c="#fff"
				sx={(theme) => ({
					alignItems: "baseline",
				})}
				variant="filled"
				color="green"
				{...badgeProps}
			>
				<Text>Mới</Text>
			</Badge>
		</Box>
	)
}
