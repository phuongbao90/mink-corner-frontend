import { UpdateAddressType, UserAddress } from "@/features/user"
import * as userApi from "@/features/user/user.api"
import type { NextApiRequest, NextApiResponse } from "next"

async function handler(
	req: NextApiRequest,
	res: NextApiResponse<
		UserAddress[] | UserAddress | { message: string } | { error: string }
	>
) {
	if (req.method === "GET") {
		const user_id =
			typeof req.query.user_id === "string" ? req.query.user_id : undefined

		const userAddresses = await userApi.fetchUserAddress(user_id)

		if (!userAddresses) {
			return res.status(404).json({ error: `userAddresses not found` })
		}

		return res.status(200).json(userAddresses)
	}
	if (req.method === "POST") {
		const addressData: UserAddress = req.body

		const createdAddress = await userApi.createUserAddress(addressData)

		if (!createdAddress) {
			return res.status(404).json({ error: `createdAddress not found` })
		}

		return res.status(200).json(createdAddress)
	}
	if (req.method === "PATCH") {
		const addressData: UpdateAddressType = req.body

		if (!addressData) {
			return res.status(404).json({ error: "addressData not supplied" })
		}

		const updatedAddress = await userApi.updateUserAddress(addressData)

		if (!updatedAddress) {
			return res.status(404).json({ error: `failed to update address` })
		}

		return res.status(200).json(updatedAddress)
	}
	if (req.method === "DELETE") {
		const addressId =
			typeof req.query.addressId === "string" ? req.query.addressId : undefined

		if (!addressId) {
			return res.status(404).json({ error: "addressId not supplied" })
		}

		const deletedAddress = await userApi.removeUserAddress(addressId)

		if (!deletedAddress) {
			return res.status(404).json({ error: `deletedAddress not found` })
		}
		return res.status(200).json({ message: "User address deleted" })
	}
}

export default handler
