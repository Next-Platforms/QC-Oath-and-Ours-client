import { useMemo, useState } from 'react'
import { getSkip } from '../lib/utils'

export type UsePaginationState = ReturnType<typeof usePagination>

export const usePagination = (initialPageSize = 10, initialPage = 1) => {
	const [pageSize, setPageSize] = useState(initialPageSize)
	const [page, setPage] = useState(initialPage)

	const onChange = (_page: number, _pageSize: number) => {
		setPageSize(_pageSize)
		setPage(_page)
	}

	const skip = useMemo(() => getSkip(page, pageSize), [page, pageSize])
	const take = pageSize

	return { page, setPage, pageSize, setPageSize, onChange, skip, take }
}
