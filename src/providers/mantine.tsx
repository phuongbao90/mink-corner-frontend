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
						"#e7e0d6",
						"#ded7c9", //!
						"#d2c4b1",
						"#c4b298",
						"#c39a7d", //!
						"#ae865a", //!
						"#a37b5d", //!
						"#665d4f",
						"#4e473d",
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
