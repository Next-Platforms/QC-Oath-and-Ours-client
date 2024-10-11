/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				peach: 'hsl(var(--peach))',
				lime: 'hsl(var(--lime))'
			}
		}
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				'.page-container': {
					width: '100%',
					'@screen sm': {
						'max-width': '640px'
					},
					'@screen md': {
						'max-width': '768px'
					},
					'@screen lg': {
						'max-width': '1024px'
					},
					'@screen xl': {
						'max-width': '1200px'
					}
				}
			}

			addUtilities(newUtilities, ['responsive'])
		}
	]
}
