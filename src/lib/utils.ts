import { navigate } from 'astro:transitions/client'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const getSkip = (page: number, pageSize: number) => {
	return page <= 1 ? 0 : pageSize * (page - 1)
}

export function formatDate(date: Date | string) {
	date = new Date(date)
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
	const day = String(date.getDate()).padStart(2, '0') // Pad single-digit days

	return `${year}.${month}.${day}`
}

type ConvertableToSearchParam = string | number | boolean | null | undefined
const toSearchParam = (
	value: ConvertableToSearchParam | ConvertableToSearchParam[]
): string | string[] | undefined => {
	if (Array.isArray(value)) {
		const values = []
		for (const v of value) {
			const convertedValue = toSearchParam(v)
			if (!convertedValue) continue
			if (Array.isArray(convertedValue)) {
				values.push(...convertedValue)
			} else {
				values.push(convertedValue)
			}
		}
		return values
	}

	if (value === undefined) return
	if (value === null) return 'null'
	return value.toString()
}

export const objToSearchParams = (
	obj: Record<string, ConvertableToSearchParam | ConvertableToSearchParam[]>
) => {
	const params = new URLSearchParams()
	for (const [key, value] of Object.entries(obj)) {
		const convertedValue = toSearchParam(value)

		if (!convertedValue) continue

		if (Array.isArray(convertedValue)) {
			for (const v of convertedValue) {
				params.append(key, v)
			}
		} else {
			params.set(key, convertedValue)
		}
	}
	return params
}

export const getSearchParams = () => {
	return new URLSearchParams(window.location.search)
}

export const updateSearchParams = (
	obj: Record<string, ConvertableToSearchParam | ConvertableToSearchParam[]>
) => {
	const currParams = getSearchParams()
	const newParams = objToSearchParams(obj)

	for (const [key, value] of newParams.entries()) {
		currParams.set(key, value)
	}

	const url = new URL(window.location.href)
	url.search = currParams.toString()
	navigate(url.href)
}
