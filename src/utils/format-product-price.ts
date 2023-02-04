export const roundNumber = (num: number | null, roundTo?: number) => {
	if (!num) return num
	return Number(num.toFixed(roundTo || 0))
}
