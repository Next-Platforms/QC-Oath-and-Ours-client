import { cn, updateSearchParams } from '../../../lib/utils'

export const GalleryTabs = ({
	categories,
	currCategory
}: {
	categories: { id: number; name: string }[]
	currCategory: { id: number; name: string } | undefined
}) => {
	return (
		<div className="flex w-full items-center justify-center gap-5 border-b border-[#999999]">
			{categories.map((item) => {
				const active = currCategory?.id === item.id
				return (
					<button
						key={item.id}
						className={cn(
							'relative z-10 flex h-[46px] w-full max-w-[187px] items-center justify-center rounded-t-[10px] border border-[#999999] bg-[#999999] text-[18px] font-bold leading-[21px] text-white',
							active &&
								'bg-white text-black before:absolute before:bottom-0 before:z-10 before:h-1 before:w-full before:translate-y-1/2 before:bg-white before:content-[""]'
						)}
						onClick={() => {
							updateSearchParams({ category: item.id })
						}}
					>
						{item.name}
					</button>
				)
			})}
		</div>
	)
}
