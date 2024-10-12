export type Post = {
	id: string
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
}
