export const retrieveObjectByField = <T extends Record<string, unknown>>({
	from,
	byField,
	fieldValue,
}: {
	from?: T[]
	byField: keyof T
	fieldValue: string | number
}): T | undefined => {
	if (!from || from.length === 0 || !byField) return undefined
	if (!(byField in from[0])) return undefined
	return from.find((el) => el[byField] === fieldValue)
}
