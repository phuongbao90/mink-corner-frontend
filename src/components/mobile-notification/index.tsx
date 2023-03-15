import { useMobileNotification } from "@/store/use-ui-store"
import { ActionIcon, Box, Drawer, Group, rem, Text, Title } from "@mantine/core"
import { useSetState } from "@mantine/hooks"
import { useEffect } from "react"

const mappedTypeToColor = {
	success: "green",
	warning: "orange",
	info: "blue",
	error: "red",
} as const

export const MobileNotification = () => {
	const [opened, { close, notificationData }] = useMobileNotification()

	const [{ title, message, type }, setState] = useSetState<{
		title?: string | undefined
		message?: string | undefined
		type: "success" | "warning" | "info" | "error"
	}>({
		type: "info",
	})

	useEffect(() => {
		setState(notificationData)
	}, [notificationData, setState])

	return (
		<Drawer
			position="top"
			size={message ? rem(135) : rem(100)}
			opened={opened}
			onClose={close}
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
				<ActionIcon variant="transparent" color={mappedTypeToColor[type]}>
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
					{title}
				</Title>
			</Group>
			{!!message && (
				<Text fz="xs" mt={rem(4)} c="gray.7" fw={500} lineClamp={2} mx="xs">
					{message}
				</Text>
			)}
		</Drawer>
	)
}
