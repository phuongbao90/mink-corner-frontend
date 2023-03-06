import { ceil } from "lodash"

export const roundNumber = (num: number | null, roundTo?: number) => {
	if (!num) return num
	return Number(num.toFixed(roundTo || 0))
}

export const formatCurrency = (num: number | null | undefined) => {
	if (typeof num !== "number") return "--"
	// if (!num) return "--"
	const _num = ceil(Math.abs(num), -3)
	return _num.toLocaleString("vi") + "đ"
}
