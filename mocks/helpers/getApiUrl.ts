export const getApiUrl = (endpoint: string) => {
	return `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`
}
