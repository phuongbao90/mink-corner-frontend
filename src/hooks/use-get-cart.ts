import { useBoundStore } from "@/store/useStore"

export const useGetCart = () => {
	const user = useBoundStore((state) => state.user)
	if (user && user.id) {
		return user.cart?.[0]
	}
	return null
}
