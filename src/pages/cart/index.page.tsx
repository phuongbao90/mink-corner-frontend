import { useGetCart, useGetUser } from "@/features"

const Cart = () => {
	const { data: user } = useGetUser()
	const userId = user?.cart?.[0]?.id
	const { data: cart, isSuccess } = useGetCart(userId)

	if (isSuccess) {
		return <div>loaded</div>
	}

	return <div>loading</div>
}

export default Cart
