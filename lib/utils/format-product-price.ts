export const roundNumber = (num: number | null, roundTo?: number = 0) => {
	if (!num) return num
	return Number(num.toFixed(roundTo))
}
