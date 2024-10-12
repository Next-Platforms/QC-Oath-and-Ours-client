import React, { useMemo } from 'react'
import { cn } from '../../lib/utils'

const PaginationControlButton = ({
	children,
	className,
	active = false,
	type = 'button',
	...rest
}: React.ComponentPropsWithoutRef<'button'> & {
	active?: boolean
}) => {
	return (
		<button
			type={type}
			className={cn(
				'inline-flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-black text-black hover:bg-[#333333] hover:text-white focus-visible:bg-[#333333] focus-visible:text-white',
				active && 'bg-black text-white',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}

function getPageNumbers(page: number, pageSize: number, total: number): number[] {
	if (pageSize <= 0 || total <= 0) return []

	// Calculate total pages
	const totalPages = Math.ceil(total / pageSize)

	// Ensure the current page is within valid bounds
	const currentPage = Math.min(Math.max(1, page), totalPages)

	// Initialize the first and last pages
	let firstPage = 1
	let lastPage = totalPages

	// Calculate the range of pages based on currentPage
	if (totalPages > 5) {
		// If there are more than 5 pages, adjust the range to be centered around currentPage
		firstPage = Math.max(1, currentPage - 2)
		lastPage = Math.min(totalPages, currentPage + 2)

		// Adjust firstPage if the range exceeds totalPages
		if (lastPage - firstPage < 4) {
			if (lastPage === totalPages) {
				firstPage = Math.max(1, lastPage - 4)
			} else {
				lastPage = Math.min(totalPages, firstPage + 4)
			}
		}
	}

	// Generate the range of pages
	const pages = []
	for (let i = firstPage; i <= lastPage; i++) {
		pages.push(i)
	}

	return pages
}

export const PaginationControls = ({
	page,
	pageSize,
	total = 0
}: {
	page: number
	pageSize: number
	total: number | undefined
}) => {
	const totalPages = useMemo(
		() => (total ? Math.ceil(total / pageSize) : page),
		[total, pageSize, page]
	)

	const setPage = (page: number) => {
		window.location.href = `?${new URLSearchParams({ page: `${page}` }).toString()}`
	}

	return (
		<div className="flex items-center gap-[11px]">
			<PaginationControlButton
				className="group"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				<svg
					className={
						'h-[10px] w-[5px] stroke-[#333] group-hover:stroke-white group-focus-visible:stroke-white'
					}
					id="Layer_2"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 6.06 10.71"
					fill="none"
				>
					<g id="content">
						<path d="M5.71,10.35L.71,5.35,5.71.35" />
					</g>
				</svg>
				<p className="sr-only">Go to the previous page</p>
			</PaginationControlButton>
			{getPageNumbers(page, pageSize, total).map((pageNumber) => {
				const isActive = pageNumber === page

				return (
					<PaginationControlButton
						key={pageNumber}
						active={isActive}
						onClick={() => setPage(pageNumber)}
					>
						<span>{pageNumber}</span>
						<p className="sr-only">Go to page {pageNumber}</p>
					</PaginationControlButton>
				)
			})}

			<PaginationControlButton
				className="group"
				disabled={page >= totalPages}
				onClick={() => setPage(page + 1)}
			>
				<svg
					className={
						'h-[10px] w-[5px] rotate-180 stroke-[#333] group-hover:stroke-white group-focus-visible:stroke-white'
					}
					id="Layer_2"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 6.06 10.71"
					fill="none"
				>
					<g id="content">
						<path d="M5.71,10.35L.71,5.35,5.71.35" />
					</g>
				</svg>
				<p className="sr-only">Go to the next page</p>
			</PaginationControlButton>
		</div>
	)
}
