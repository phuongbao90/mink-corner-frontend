import { useBoundStore } from "@/store/useStore"
import {
	ActionIcon,
	Box,
	Drawer,
	Group,
	rem,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core"
import { useState } from "react"

const mappedTypeToColor = {
	success: "green",
	warning: "orange",
	info: "blue",
	error: "red",
} as const

export const MobileNotification = () => {
	const opened = useBoundStore((s) => s.isMobileNotificationOpened)
	const mobileNotificationData = useBoundStore((s) => s.mobileNotificationData)
	const toggleIsMobileNotificationOpened = useBoundStore(
		(s) => s.actions.toggleIsMobileNotificationOpened
	)

	return (
		<Drawer
			position="top"
			size={mobileNotificationData.message ? rem(135) : rem(100)}
			opened={opened}
			onClose={toggleIsMobileNotificationOpened}
			title={<Box />}
			overlayProps={{ opacity: 0.5, blur: 3 }}
			styles={{
				close: {
					color: "#000",
				},
				header: {
					paddingBottom: rem(8),
				},
			}}
			transitionProps={{
				transition: "slide-down",
				duration: 150,
			}}
			zIndex={201}
		>
			<Group sx={{ gap: rem(2) }}>
				<ActionIcon
					variant="transparent"
					color={mappedTypeToColor[mobileNotificationData.type]}
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
							fill="currentColor"
						></path>
					</svg>
				</ActionIcon>
				<Title order={4} size="h6">
					{mobileNotificationData.title}
				</Title>
			</Group>
			{!!mobileNotificationData.message && (
				<Text fz="xs" mt={rem(4)} c="gray.7" fw={500} lineClamp={2} mx="xs">
					{mobileNotificationData.message}
				</Text>
			)}
		</Drawer>
	)
}
