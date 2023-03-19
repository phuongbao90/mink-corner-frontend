import { ShippingMethod } from "@/features/checkout"
import { useEffect, useState } from "react"
import { useGetShippingMethods } from "@/features/checkout"

const HCM_PROVINCE_ID = "202"

type Props = {
	selectedCityId: string | undefined
	selectedShippingMethodId: string | undefined
}

export const useShippingMethodActions = ({
	selectedCityId,
	selectedShippingMethodId,
}: Props) => {
	const isHCM = selectedCityId === HCM_PROVINCE_ID
	const { data, isSuccess, isError, isFetching } = useGetShippingMethods()

	const [selectedShippingMethod, setSelectedShippingMethod] = useState<
		ShippingMethod | undefined
	>(undefined)

	const selectShippingMethod = (id: string) => {
		const matching = data?.find((method) => method.id === id)
		setSelectedShippingMethod(matching)
	}

	useEffect(() => {
		const foundShippingMethod = data?.find(
			(el) => el.id === selectedShippingMethodId
		)
		setSelectedShippingMethod(foundShippingMethod)
	}, [selectedShippingMethodId, data])

	const filterShippingMethods = () => {
		if (!data) return
		return data.filter((method) => {
			if (isHCM) return method.applicable_to === "202"
			return method.applicable_to === "outside-hcm"
		})
	}

	return {
		data: filterShippingMethods(),
		isSuccess,
		isError,
		isFetching,
		selectShippingMethod,
		selectedShippingMethod,
	}
}
