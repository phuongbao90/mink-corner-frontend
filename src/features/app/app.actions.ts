import { apiRoutes } from "@/constant"
import { AppConfig, AppNotification } from "@/features/app"
import { fetcher } from "@/services"
import { NotificationProps, showNotification } from "@mantine/notifications"
import { useQuery } from "@tanstack/react-query"

export const appKeys = {
	all: [{ scope: "app-configs" }],
}

export async function fetchAppConfigs() {
	return fetcher<AppConfig>({
		url: apiRoutes.appConfigs,
	})
}

export const useGetAppConfigs = () => {
	return useQuery({
		queryKey: appKeys.all,
		queryFn: fetchAppConfigs,
		staleTime: 1000 * 60 * 60 * 24,
	})
}

export const appNotification = ({
	type,
	message,
	id,
	title,
}: AppNotification) => {
	const mapped: Record<AppNotification["type"], string> = {
		success: "teal",
		info: "blue",
		error: "red",
		warning: "orange",
	}

	const data: NotificationProps = {
		message,
		id,
		color: mapped[type],
		title,
		autoClose: 2000,
	}

	showNotification(data)
}
