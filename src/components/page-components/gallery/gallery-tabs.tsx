import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import ChevronDownIcon from '../../../../public/hamburger.svg'
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
			<div className="hidden md:contents">
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
			<Select
				defaultValue={currCategory ? `${currCategory?.id}` : ''}
				onValueChange={(value) => {
					updateSearchParams({ category: value })
				}}
			>
				<SelectTrigger className="w-[187px] md:hidden">
					<SelectValue placeholder="Loading..." />
				</SelectTrigger>
				<SelectContent sideOffset={-4} className="w-[187px]">
					{categories.map((category) => {
						return (
							<SelectItem key={category.id} value={`${category.id}`}>
								{category.name}
							</SelectItem>
						)
					})}
				</SelectContent>
			</Select>
		</div>
	)
}

const Select = SelectPrimitive.Root

const SelectValue = SelectPrimitive.Value

const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-center text-[18px] font-bold leading-[21px] text-black outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
			className
		)}
		{...props}
	>
		<SelectPrimitive.ItemText asChild>
			<span className="mx-auto text-center">{children}</span>
		</SelectPrimitive.ItemText>
	</SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			'relative z-10 flex h-[46px] w-full max-w-[187px] items-center justify-center rounded-t-[10px] border border-[#999999] bg-white text-[18px] font-bold leading-[21px] text-black before:absolute before:bottom-0 before:z-10 before:h-1 before:w-full before:translate-y-1/2 before:bg-white before:content-[""]',
			className
		)}
		{...props}
	>
		{children}
		<SelectPrimitive.Icon asChild>
			<img className="ml-2 h-4 w-4 object-cover opacity-50" src={ChevronDownIcon.src} />
		</SelectPrimitive.Icon>
	</SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-b-md border border-[#999999] bg-white shadow-md',
				position === 'popper' &&
					'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
				className
			)}
			position={position}
			{...props}
		>
			<SelectPrimitive.Viewport
				className={cn(
					'p-1',
					position === 'popper' &&
						'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
				)}
			>
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName
