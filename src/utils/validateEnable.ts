export const validateEnable = (val: unknown) => {
	if (typeof val === "string" && (val === "undefined" || val === "null"))
		return false
	return Boolean(val)
}
