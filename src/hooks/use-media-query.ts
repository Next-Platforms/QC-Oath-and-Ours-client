import { useEffect, useState } from 'react'

// Tailwind default breakpoints
const breakpoints = {
	sm: {
		query: '(max-width: 640px)'
	},
	md: {
		query: '(max-width: 768px)'
	},

	lg: {
		query: '(max-width: 1024px)'
	},

	xl: {
		query: '(max-width: 1280px)'
	},

	'2xl': {
		query: '(max-width: 1536px)'
	}
} as const
type Breakpoint = keyof typeof breakpoints

export const isMediaQuery = (value: Breakpoint) =>
	typeof window !== 'undefined' ? window.matchMedia(breakpoints[value].query).matches : false

export const useMediaQuery = (value: Breakpoint, initialValue = false) => {
	const [matches, setMatches] = useState(
		typeof window !== 'undefined' ? isMediaQuery(value) : initialValue
	)

	useEffect(() => {
		const handler = () => {
			setMatches(isMediaQuery(value))
		}
		handler()

		window.addEventListener('resize', handler)

		return function cleanup() {
			window.removeEventListener('resize', handler)
		}
	}, [setMatches, value])

	return matches
}
