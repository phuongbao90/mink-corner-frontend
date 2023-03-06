import { NotificationsProvider } from "@mantine/notifications"
import { MantineProvider as _MantineProvider } from "@mantine/core"
import { ReactNode } from "react"

export const MantineProvider = ({ children }: { children: ReactNode }) => {
	return (
		<_MantineProvider withGlobalStyles withNormalizeCSS>
			<NotificationsProvider>{children}</NotificationsProvider>
		</_MantineProvider>
	)
}
