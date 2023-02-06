import type { NextApiRequest, NextApiResponse } from "next"
import { User } from "@/features/user"
import * as userAPI from "@/services"

async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
	if (req.method === "GET") {
		const user_id =
			typeof req.query.user_id === "string" ? req.query.user_id : undefined

		if (!user_id) return res.status(404)

		const response = await userAPI.getUser(user_id)

		if (!response || response instanceof Error) {
			return res.status(404)
		}

		return res.status(200).json(response)
	}

	if (req.method === "POST") {
		const response = await userAPI.createUser()
		if (!response || response instanceof Error) return res.status(404)
		return res.status(200).json(response)
	}

	if (req.method === "PUT") {
	}
	if (req.method === "DELETE") {
	}
}

export default handler
