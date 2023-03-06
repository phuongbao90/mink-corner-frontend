import { PaymentType } from "@/features/checkout"
import * as checkoutAPI from "@/services/api/checkout"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<PaymentType[] | { error: string }>
) {
	if (req.method === "GET") {
		const paymentTypes = await checkoutAPI.fetchPaymentTypes()

		if (!paymentTypes) {
			return res.status(404).json({ error: `paymentTypes  not found` })
		}

		return res.status(200).json(paymentTypes)
	}
}

export default handler
