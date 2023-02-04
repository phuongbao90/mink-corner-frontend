import { fetcher } from "@/services"
import { storage } from "@/utils"
import { useQuery } from "@tanstack/react-query"
import { apiRoutes } from "@/constant"
import { User } from "@/features/user"

export const userKeys = {
	detail: (user_id: string | undefined) => [
		{ scope: "user", type: "detail", user_id },
	],
}

export const useGetUser = (_user_id?: string) => {
	let user_id = _user_id
	if (!user_id) user_id = storage.getItem("user_id")

	return useQuery({
		queryKey: userKeys.detail(user_id),
		queryFn: () =>
			fetcher<User>({
				url: apiRoutes.user,
				params: {
					user_id,
				},
			}),

		enabled: Boolean(user_id) && user_id !== "undefined",
	})
}

export const logoutUser = () => {}
