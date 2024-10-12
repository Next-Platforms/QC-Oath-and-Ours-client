import type { Post } from '../types/data'

const POSTS_ENDPOINT = import.meta.env.PUBLIC_WP_POSTS_ENDPOINT

export const PostsApi = {
	list: async () => {
		const res = await fetch(POSTS_ENDPOINT)
		const posts = await res.json()

		return posts as Post[]
	},
	get: async (slug: string) => {
		const res = await fetch(`${POSTS_ENDPOINT}?slug=${slug}`)
		const [post] = await res.json()

		return post as Post
	}
}
