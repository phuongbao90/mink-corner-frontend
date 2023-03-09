import { CartItem } from "@/features/cart/cart.types"

import {
	CartItemImageContainer,
	CartItemDetailContainer,
	CartItemImage,
	CartItemPrice,
	CartItemQuantityInput,
	DeleteCartItemIcon,
	MaxQuantityReachedMessage,
	OptionInfo,
	ProductTitle,
	QuantityIndicator,
} from "@/features/cart/components/cart-item"

import { Grid } from "@mantine/core"
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react"

type PropsType = {
	children: ReactNode | ReactNode[]
	cartItem: CartItem
}

type ContextPropsType = {
	cartItem: CartItem
	isMaxQuantityMet: boolean
	setIsMaxQuantityMet: Dispatch<SetStateAction<boolean>>
}

const CartItemContext = createContext<ContextPropsType | null>(null)

export const useCartItemContext = () => {
	const context = useContext(CartItemContext)
	return context
}

function CartItemTemplate({ children, cartItem }: PropsType) {
	const [isMaxQuantityMet, setIsMaxQuantityMet] = useState(false)

	return (
		<CartItemContext.Provider
			value={{ cartItem, setIsMaxQuantityMet, isMaxQuantityMet }}
		>
			<Grid>{children}</Grid>
		</CartItemContext.Provider>
	)
}

CartItemTemplate.ImageContainer = CartItemImageContainer
CartItemTemplate.DetailContainer = CartItemDetailContainer
CartItemTemplate.Image = CartItemImage
CartItemTemplate.Title = ProductTitle
CartItemTemplate.Price = CartItemPrice
CartItemTemplate.Option = OptionInfo
CartItemTemplate.QuantityInput = CartItemQuantityInput
CartItemTemplate.DeleteIcon = DeleteCartItemIcon
CartItemTemplate.MaxQuantityReachedMessage = MaxQuantityReachedMessage
CartItemTemplate.QuantityIndicator = QuantityIndicator

export { CartItemTemplate }
