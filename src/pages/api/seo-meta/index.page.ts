import type { NextApiRequest, NextApiResponse } from "next"
import * as appAPI from "@/features/app/app.api"
import { PageRouteValueType, SEOMetaType } from "@/features/app"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SEOMetaType | { error: string }>
) {
	const page = typeof req.query.page === "string" ? req.query.page : undefined

	if (req.method === "GET") {
		if (!page) return res.status(404)

		const seoMeta = await appAPI.getSeoMeta(page as PageRouteValueType)

		if (!seoMeta || seoMeta instanceof Error) {
			return res.status(404).json({ error: "seo meta not found" })
		}

		return res.status(200).json(seoMeta)
	}
}

export default handler
