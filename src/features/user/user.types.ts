import { Status } from "@/types"

export type UserState = {
	user: User | null
	user_id: string | null
	set_user: (user: User) => void
}

export type User = {
	id: string
	name: string
	anonymous: boolean
	email_address: string | null
	phone_number: string | null
	status: Status
	cart: [
		{
			id: string
		}
	]
}

export type UpdateUserData = {
	id: string
	name: string
	email_address: string
	phone_number: string
	// address?: {
	// 	id?: string
	// 	address: string
	// 	city: string
	// 	district: string
	// 	ward: string
	// 	note?: string
	// 	is_default?: boolean
	// }
}
