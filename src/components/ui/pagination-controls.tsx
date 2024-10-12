import { useMemo } from 'react'
import { cn } from '../../lib/utils'

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
			<button
				className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-black"
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				<img className={'h-[10px] w-[5px]'} src="./left-arrow.svg" />
			</button>
			{new Array(Math.min(5, totalPages)).fill(0).map((_, idx) => {
				const pageNumber = idx + page
				const isActive = pageNumber === page

				return (
					<button
						className={cn(
							'inline-flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-black',
							isActive && 'bg-black text-white'
						)}
						onClick={() => setPage(pageNumber)}
					>
						{pageNumber}
					</button>
				)
			})}
			<button
				className="inline-flex h-[35px] w-[35px] items-center justify-center rounded-full border-2 border-black"
				disabled={page >= totalPages}
				onClick={() => setPage(page + 1)}
			>
				<img className={'h-[10px] w-[5px] rotate-180'} src="./left-arrow.svg" />
			</button>
		</div>
	)
}
