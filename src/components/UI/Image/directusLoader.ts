export const directusLoader = ({ src: fileId }: { src: string }) => {
	return `${process.env.BACKEND_URL}/assets/${fileId}`
}
