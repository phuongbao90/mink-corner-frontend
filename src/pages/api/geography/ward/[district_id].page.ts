import { Ward } from "@/features/checkout"
import * as checkoutAPI from "@/services/api/checkout"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Ward[] | { error: string }>
) {
	if (req.method === "GET") {
		const district_id =
			typeof req.query.district_id === "string"
				? req.query.district_id
				: undefined

		const wards = await checkoutAPI.fetchWards(district_id)

		if (!wards) {
			return res.status(404).json({ error: `wards  not found` })
		}

		return res.status(200).json(wards)
	}
}

export default handler
