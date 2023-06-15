export type Status = "published" | "draft" | "archived"
export type CoverImage = {
	id: string
} | null

export type DirectusImage = {
	directus_files_id: {
		id: string
		title?: string
		width?: number
		height?: number
	} | null
}

export type DirectusImages = DirectusImage[] | null
