export const flatten = (
	obj: Record<string, unknown>,
	parent?: string
): Record<string, unknown> => {
	let res: Record<string, unknown> = {}

	for (const [key, value] of Object.entries(obj)) {
		// const propName = parent ? parent + "_" + key : key
		const propName = key
		const flattened: Record<string, unknown> = {}

		if (value instanceof Date) {
			flattened[key] = value.toISOString()
		} else if (typeof value === "object" && value !== null) {
			res = { ...res, ...flatten(value as Record<string, unknown>, propName) }
		} else {
			res[propName] = value
		}
	}

	return res
}
