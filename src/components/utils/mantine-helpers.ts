import { CSSObject, MantineTheme } from "@mantine/core"

export const hiddenOnXs = (theme: MantineTheme): CSSObject => ({
	[theme.fn.smallerThan("xs")]: {
		display: "none",
	},
})

export const hiddenAboveXs = (theme: MantineTheme): CSSObject => ({
	[theme.fn.largerThan("xs")]: {
		display: "none",
	},
})

export const linkStyles = (theme: MantineTheme): CSSObject => ({
	cursor: "pointer",
	"&:hover": {
		color: theme.primaryColor,
	},
})
