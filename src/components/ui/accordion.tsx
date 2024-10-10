'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { cn } from '../../lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn('rounded-2xl border-2 border-black', className)}
		{...props}
	/>
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn('group relative min-h-16 w-full text-start', className)}
			{...props}
		>
			<div className="absolute inset-0 flex h-[50px] w-[60px] items-center justify-center rounded-br-2xl rounded-tl-2xl bg-black text-base leading-[19px] text-white md:text-lg md:leading-[21px]">
				<img src="/search.svg" className="h-7 w-5" />
			</div>
			<div className="ml-[60px] flex items-center gap-4 p-4">
				{children}
				<div className="ml-auto text-lg">
					<p className="group-data-[state=open]:hidden">+</p>
					<p className="group-data-[state=closed]:hidden">-</p>
				</div>
			</div>
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden pl-[76px] pr-8 text-base leading-[19px] md:leading-[33px]"
		{...props}
	>
		<div className={cn('pb-4 pt-0', className)}>{children}</div>
	</AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
