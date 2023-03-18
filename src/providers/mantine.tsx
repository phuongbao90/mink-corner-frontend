import { MantineProvider as _MantineProvider } from "@mantine/core"
import { ReactNode } from "react"
import { Notifications } from "@mantine/notifications"

export const MantineProvider = ({ children }: { children: ReactNode }) => {
	return (
		<_MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: "light",
				primaryColor: "brown",
				colors: {
					darkGray: [
						"#bdbfc0",
						"#a5a8aa",
						"#999d9f",
						"#8d9193",
						"#757a7d",
						"#696f71",
						"#5d6366",
						"#454c50",
						"#394144",
						"#202629",
					],
					darkTeal: [
						"#acb3b3",
						"#979f9f",
						"#8c9595",
						"#768181",
						"#606d6d",
						"#4a5959",
						"#3f4f4f",
						"#384646",
						"#313d3d",
						"#293434",
					],
					brown: [
						"#f6edd2",
						"#f0e1b9", //!
						"#eed89d",
						"#dfc887",
						"#bb9d5b", //!
						"#966d40", //!
						"#7d532a", //!
						"#543618",
						"#342110",
						"#1f1c18",
					],
				},
			}}
		>
			<Notifications />
			{children}
		</_MantineProvider>
	)
}
