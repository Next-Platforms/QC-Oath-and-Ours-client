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

export const PaginationControls = ({
	page,
	pageSize,
	setPage,
	total
}: {
	page: number
	pageSize: number
	total: number | undefined
	setPage: (val: number) => void
	setPageSize: (val: number) => void
}) => {
	const totalPages = useMemo(
		() => (total ? Math.ceil(total / pageSize) : page),
		[total, pageSize, page]
	)

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
			</PaginationControlButton>
			{new Array(Math.min(5, totalPages)).fill(0).map((_, idx) => {
				const pageNumber = idx + page
				const isActive = pageNumber === page

				return (
					<PaginationControlButton active={isActive} onClick={() => setPage(pageNumber)}>
						{pageNumber}
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
			</PaginationControlButton>
		</div>
	)
}
