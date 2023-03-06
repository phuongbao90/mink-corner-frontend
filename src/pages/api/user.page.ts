import type { NextApiRequest, NextApiResponse } from "next"
import { UpdateUserData, User } from "@/features/user"
import * as userAPI from "@/services"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<User | { error: string }>
) {
	const user_id =
		typeof req.query.user_id === "string" ? req.query.user_id : undefined

	if (req.method === "GET") {
		if (!user_id) return res.status(404)

		const shopping_user = await userAPI.fetchUser(user_id)

		if (!shopping_user || shopping_user instanceof Error) {
			return res.status(404).json({ error: "user not found" })
		}

		return res.status(200).json(shopping_user)
	}

	if (req.method === "POST") {
		const response = await userAPI.createUser()
		if (!response || response instanceof Error)
			return res.status(404).json({ error: "failed to create user" })
		return res.status(200).json(response)
	}

	if (req.method === "PATCH") {
		const user_data: UpdateUserData = req.body

		const response = await userAPI.updateUser(user_data)
		if (!response || response instanceof Error)
			return res.status(404).json({
				error: "failed to update user",
			})
		return res.status(200).json(response)
	}
	if (req.method === "DELETE") {
	}
}

export default handler
