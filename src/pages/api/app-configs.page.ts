import { AppConfig } from "@/features/app"
import * as appApi from "@/features/app/app.api"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AppConfig | { error: string }>
) {
	if (req.method === "GET") {
		const appConfigs = await appApi.getAppConfigs()

		if (!appConfigs) {
			return res.status(404).json({ error: `appConfigs  not found` })
		}

		return res.status(200).json(appConfigs)
	}
}

export default handler
