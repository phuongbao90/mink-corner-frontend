import { useIsMobile } from "@/hooks/use-media-query"
import { useMobileNotification } from "@/store/use-ui-store"
import { notifications } from "@mantine/notifications"

type NotifyPropsType = {
	type?: "success" | "info" | "warning" | "error"
	title?: string
	message?: string
}

const mappedTypeToColor = {
	success: "green",
	warning: "orange",
	info: "blue",
	error: "red",
} as const

export const useNotify = () => {
	const { isMobile } = useIsMobile()
	const [, { open }] = useMobileNotification()

	const notify = ({ type = "info", title, message }: NotifyPropsType) => {
		if (isMobile) {
			open({
				title,
				message,
				type,
			})
			return
		}

		notifications.show({
			title,
			message,
			color: mappedTypeToColor[type],
		})
	}

	return notify
}
