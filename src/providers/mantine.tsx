import { MantineProvider as _MantineProvider } from "@mantine/core"
import { ReactNode } from "react"
import { Notifications } from "@mantine/notifications"

export const MantineProvider = ({ children }: { children: ReactNode }) => {
	return (
		<_MantineProvider withGlobalStyles withNormalizeCSS>
			<Notifications />
			{children}
		</_MantineProvider>
	)
}
