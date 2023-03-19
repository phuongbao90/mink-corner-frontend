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

export type UserAddress = {
	id: string
	user: User
	address: string
	city: {
		id: string
		name: string
	}
	district: {
		id: string
		name: string
	}
	ward: {
		id: string
		name: string
	}
	note?: string
	is_default?: string
}

export type CreateAddressType = {
	address: string
	city: string
	district: string
	ward: string
	user: { id: string }
}
export type UpdateAddressType = Omit<CreateAddressType, "user"> & { id: string }
