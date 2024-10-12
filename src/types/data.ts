export type Post = {
	id: number
	date: string
	modified: string
	slug: string
	title: { rendered: string }
	content: {
		rendered: string
	}
	excerpt: {
		rendered: string
	}
	categories: { id: number; name: string }[]
}

export type UnhydratedPost = Omit<Post, 'categories'> & {
	categories: number[]
}

export type GalleryItem = {
	id: number
	title: { rendered: string }
	media_html: string
}
