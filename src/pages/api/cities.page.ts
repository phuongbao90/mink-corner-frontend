import { City } from "@/features/checkout"
import * as checkoutAPI from "@/services/api/checkout"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<City[] | { error: string }>
) {
	if (req.method === "GET") {
		const cities = await checkoutAPI.fetchCities()

		if (!cities) {
			return res.status(404).json({ error: `cities  not found` })
		}

		return res.status(200).json(cities)
	}
}

export default handler
