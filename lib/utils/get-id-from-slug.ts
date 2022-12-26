export const getIdFromSlug = (slug: string) => {
	const splited = slug.split("-")
	const length = splited.length
	return Number(splited[length - 1])
}
