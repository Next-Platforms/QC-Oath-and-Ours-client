import type { GalleryItem, Post, UnhydratedPost } from '../types/data'

const SERVER_URL = import.meta.env.PUBLIC_WP_ENDPOINT

const hydratePost = (post: UnhydratedPost, categories: { id: number; name: string }[]): Post => {
	const hydratedCategories = []

	for (const c of post.categories.toSorted((a, b) => (a < b ? -1 : 1))) {
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

export const GalleryItemsApi = {
	list: async ({
		take = 9,
		skip = 0
	}: {
		take?: number | string | undefined
		skip?: number | string | undefined
	}) => {
		if (process.env.NODE_ENV === 'development') {
			return {
				items: new Array(+take).fill({
					id: 0,
					media_html: `<img src="./hero.jpg" alt="Image of A wedding photo" style="max-width:100%;" />`,
					title: { rendered: 'A wedding photo' }
				} satisfies GalleryItem),
				total: 24
			}
		} else {
			const res = await fetch(
				`${SERVER_URL}/gallery_item?${new URLSearchParams({
					per_page: `${take}`,
					offset: `${skip}`
				}).toString()}`
			)

			const items = (await res.json()) as GalleryItem[]

			const total = Number(res.headers.get('x-wp-total') ?? items.length)

			return { items, total }
		}
	}
}
