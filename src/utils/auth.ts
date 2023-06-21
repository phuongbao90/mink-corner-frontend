import { User } from "@/features/user"
import { storage } from "@/utils/localStorage"

export const getUserIdExistInLocalStorage = () => {
	const storedUserId: string | null = storage.getItem("user_id")

	return storedUserId
}

export const validateUserIdFromServer = () => {}

export const saveUserIdToLocalStorage = (user: User | null) => {
	if (!user) return

	try {
		storage.setItem("userId", JSON.stringify(user.id))
	} catch (error) {
		console.error(error)
	}
}

export const getUserIdFromLocalstorage = () => {
	try {
		const item = storage.getItem("userId")
		return item ? JSON.parse(item) : null
	} catch (error) {
		console.error(error)
		return null
	}
}
