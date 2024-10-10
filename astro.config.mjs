// @ts-check
import { defineConfig } from 'astro/config'

import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'

import react from '@astrojs/react'
import svgr from 'vite-plugin-svgr'

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			applyBaseStyles: false
		}),
		icon(),
		react()
	],
	vite: {
		plugins: [svgr()]
	}
})
