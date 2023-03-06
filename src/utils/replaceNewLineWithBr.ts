export function replaceWithBr(text?: string) {
	if (!text || typeof text !== "string") return ""
	return text.replace(/\n/g, "<br />")
}
