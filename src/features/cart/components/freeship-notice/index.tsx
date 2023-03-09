import { useGetAppConfigs } from "@/features/app"
import { useGetCart } from "@/features/cart"
import { formatCurrency, sumCartAmount } from "@/utils"
import { Alert, Box, Text } from "@mantine/core"
import { AlertCircle, Gift } from "react-feather"

export const FreeshipNotice = () => {
	const { data: cart, isSuccess } = useGetCart()
	const { data: appConfigs, isSuccess: isAppconfigsSuccess } =
		useGetAppConfigs()
	const totalCartAmount = sumCartAmount(cart?.items)

	if (!isSuccess || !isAppconfigsSuccess) return null
	const { is_freeship_program_on, freeship_target, freeship_limit } = appConfigs

	if (!is_freeship_program_on) return null

	const diff = totalCartAmount - +freeship_target

	if (cart.items_func.count === 0) return null

	if (diff < 0) {
		return (
			<Box>
				<Alert icon={<AlertCircle size={16} />} color="orange" variant="light">
					Mua thêm {formatCurrency(diff)} để được{" "}
					<Text span fw={700}>
						Freeship
					</Text>
				</Alert>
			</Box>
		)
	} else {
		return (
			<Box>
				<Alert icon={<Gift size={16} />} color="green" variant="light">
					<Text>
						Đơn hàng của bạn được{" "}
						<Text span fw={700}>
							Freeship
						</Text>
					</Text>
				</Alert>
			</Box>
		)
	}
}
