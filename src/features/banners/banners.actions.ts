import { apiRoutes } from "@/constant"
import { Banner } from "./banners.types"
import { fetcher } from "@/services"
import { useQuery } from "@tanstack/react-query"

export const bannerKeys = {
	detail: (name: string | undefined) => [
		{ scope: "banner", type: "detail", name },
	],
}

export const useGetBanner = (name?: string) => {
	return useQuery({
		queryKey: bannerKeys.detail(name),
		queryFn: () =>
			fetcher<Banner>({
				url: apiRoutes.banner,
				params: {
					name,
				},
			}),
		staleTime: 1000 * 60 * 60 * 24,
		enabled: !!name,
	})
}
