export const validateEnable = (val: unknown) => {
	if (val === "undefined" || val === "null") {
		return false
	}

	// if (typeof val === "string" && (val === "undefined" || val === "null"))
	// 	return false
	return Boolean(val)
}
