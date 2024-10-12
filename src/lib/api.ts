import type { Post, UnhydratedPost } from '../types/data'

const SERVER_URL = import.meta.env.PUBLIC_WP_ENDPOINT

const hydratePost = (post: UnhydratedPost, categories: { id: number; name: string }[]): Post => {
	const hydratedCategories = []

	for (const c of post.categories) {
		const cat = categories.find((x) => x.id === c)
		if (!cat) continue
		hydratedCategories.push(cat)
	}

	return { ...post, categories: hydratedCategories }
}

export const PostsApi = {
	list: async ({
		take = 9,
		skip = 0
	}: {
		take?: number | string | undefined
		skip?: number | string | undefined
	}) => {
		const res = await fetch(
			`${SERVER_URL}/posts?${new URLSearchParams({
				per_page: `${take}`,
				offset: `${skip}`
			}).toString()}`
		)

		const categoriesResponse = await fetch(`${SERVER_URL}/categories`)
		const categories = await categoriesResponse.json()

		const posts = ((await res.json()) as UnhydratedPost[]).map((post) =>
			hydratePost(post, categories)
		)

		const total = Number(res.headers.get('x-wp-total') ?? posts.length)

		return { posts, total }
	},
	get: async (slug: string) => {
		const res = await fetch(`${SERVER_URL}/posts?slug=${slug}`)
		const [post] = await res.json()

		return post as Post
	}
}
