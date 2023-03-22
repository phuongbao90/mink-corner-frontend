import { apiRoutes } from "@/constant"
import {
	AppConfig,
	AppNotification,
	PageRouteValueType,
	SEOMetaType,
} from "@/features/app"
import { fetcher } from "@/services"
import { NotificationProps, showNotification } from "@mantine/notifications"
import { useQuery } from "@tanstack/react-query"

export const appKeys = {
	configs: [{ scope: "app-configs" }],
	seoMeta: (page: PageRouteValueType) => [
		{
			scope: "seo-meta",
			type: "detail",
			page,
		},
	],
}

export async function fetchAppConfigs() {
	return fetcher<AppConfig>({
		url: apiRoutes.appConfigs,
	})
}

export const useGetAppConfigs = () => {
	return useQuery({
		queryKey: appKeys.configs,
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

export const useGetSeoMeta = (page: PageRouteValueType) => {
	return useQuery({
		queryKey: appKeys.seoMeta(page),
		queryFn: () =>
			fetcher<SEOMetaType>({
				url: `${apiRoutes.seoMeta}`,
				params: {
					page,
				},
			}),
		enabled: !!page,
		staleTime: 1000 * 60 * 60 * 24,
	})
}
