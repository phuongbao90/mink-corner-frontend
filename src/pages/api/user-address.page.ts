import { UserAddress } from "@/features/checkout"
import * as checkoutAPI from "@/services/api/checkout"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<UserAddress[] | { error: string }>
) {
	if (req.method === "GET") {
		const user_id =
			typeof req.query.user_id === "string" ? req.query.user_id : undefined

		const userAddresses = await checkoutAPI.fetchUserAddress(user_id)

		if (!userAddresses) {
			return res.status(404).json({ error: `userAddresses not found` })
		}

		return res.status(200).json(userAddresses)
	}
}

export default handler
