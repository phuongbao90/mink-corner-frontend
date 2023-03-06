import * as categoryAPI from "@/services/api/categories"
import type { NextApiRequest, NextApiResponse } from "next"
import { Category } from "@/features/categories"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Category[] | { error: string } | { message: string }>
) {
	if (req.method === "GET") {
		const categories = await categoryAPI.getCategories()

		if (!categories)
			return res.status(404).json({ error: "categories not found" })

		return res.status(200).json(categories)
	}

	if (req.method === "POST") {
	}
	if (req.method === "PATCH") {
	}
	if (req.method === "DELETE") {
	}
}

export default handler
