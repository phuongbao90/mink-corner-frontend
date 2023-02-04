import { Cart, CartItem } from "./cart-types"
import { Status } from "./general"

export type UserState = {
	user: User | null
	set_user: (user: User) => void
}

export type User = {
	id: string
	device_id?: string
	email_address?: string
	phone_number?: string
	status: Status
	cart: [Cart]
}
