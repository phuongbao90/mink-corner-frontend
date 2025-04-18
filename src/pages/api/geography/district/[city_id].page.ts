import { District } from "@/features/checkout"
import * as checkoutAPI from "@/services/api/checkout"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<District[] | { error: string }>
) {
	if (req.method === "GET") {
		const city_id =
			typeof req.query.city_id === "string" ? req.query.city_id : undefined

		const districts = await checkoutAPI.fetchDistricts(city_id)

		if (!districts) {
			return res.status(404).json({ error: `districts  not found` })
		}

		return res.status(200).json(districts)
	}
}

export default handler
