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
