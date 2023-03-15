import { useIsMobile } from "@/hooks/use-media-query"
import { useBoundStore } from "@/store/useStore"
import { notifications } from "@mantine/notifications"

type NotifyPropsType = {
	type?: "success" | "info" | "warning" | "error"
	title: string
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
	const showMobileNotification = useBoundStore(
		(s) => s.actions.showMobileNotification
	)

	const notify = ({ type = "info", title, message }: NotifyPropsType) => {
		if (isMobile) {
			showMobileNotification({
				type,
				title,
				message,
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
