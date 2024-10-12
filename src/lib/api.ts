import type { GalleryItem, Post, UnhydratedGalleryItem, UnhydratedPost } from '../types/data'
import { objToSearchParams } from './utils'

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

const hydrateGalleryItem = (
	item: UnhydratedGalleryItem,
	categories: { id: number; name: string }[]
) => {
	const hydratedCategories = []

	for (const c of item.gallery_category.toSorted((a, b) => (a < b ? -1 : 1))) {
		const cat = categories.find((x) => x.id === c)
		if (!cat) continue
		hydratedCategories.push(cat)
	}

	return { ...item, gallery_category: hydratedCategories }
}

export const GalleryCategoryApi = {
	list: async () => {
		if (process.env.NODE_ENV === 'production') {
			return [
				{ id: 0, name: 'Blah' },
				{ id: 1, name: 'Cat1' },
				{ id: 2, name: 'Cat2' },
				{ id: 3, name: 'Cat2' }
			]
		} else {
			const categoriesResponse = await fetch(`${SERVER_URL}/gallery_category`)
			const categories = await categoriesResponse.json()

			return categories as GalleryItem['gallery_category']
		}
	}
}

export const GalleryItemsApi = {
	list: async ({
		take = 9,
		skip = 0,
		gallery_category
	}: {
		take?: number | string | undefined
		skip?: number | string | undefined
		gallery_category?: number | string | undefined
	}): Promise<{ items: GalleryItem[]; total: number }> => {
		if (process.env.NODE_ENV === 'production') {
			return {
				items: new Array(+take).fill({
					id: 0,
					media_html: `<img src="./hero.jpg" alt="Image of A wedding photo" style="max-width:100%;" />`,
					title: { rendered: 'A wedding photo' },
					gallery_category: [{ id: 0, name: 'Blah' }]
				} satisfies GalleryItem),
				total: 24
			}
		} else {
			const res = await fetch(
				`${SERVER_URL}/gallery_item?${objToSearchParams({
					per_page: `${take}`,
					offset: `${skip}`,
					gallery_category
				}).toString()}`
			)

			const categories = await GalleryCategoryApi.list()

			const items = ((await res.json()) as UnhydratedGalleryItem[]).map((item) =>
				hydrateGalleryItem(item, categories)
			)

			const total = Number(res.headers.get('x-wp-total') ?? items.length)

			return { items, total }
		}
	}
}
