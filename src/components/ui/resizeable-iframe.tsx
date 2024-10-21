import React, { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'

export const ResizeableIframe = ({
	className,
	containerProps,
	...rest
}: React.ComponentPropsWithoutRef<'iframe'> & {
	containerProps?: Partial<React.ComponentPropsWithoutRef<'div'>>
}) => {
	const containerClassName = containerProps?.className

	const iframeRef = useRef<HTMLIFrameElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const adjustImageSize = () => {
			if (!iframeRef.current || !containerRef.current) return

			const width = containerRef.current.clientWidth
			const height = containerRef.current.clientHeight

			iframeRef.current.width = `${width}px`
			iframeRef.current.height = `${height}px`
		}

		adjustImageSize()

		window.addEventListener('resize', adjustImageSize)

		return function cleanup() {
			window.removeEventListener('resize', adjustImageSize)
		}
	}, [])

	return (
		<div
			{...containerProps}
			className={cn('w-full overflow-hidden', containerClassName)}
			ref={containerRef}
		>
			<iframe
				className={className}
				{...rest}
				style={{ border: 0 }}
				allowFullScreen
				loading="lazy"
				referrerPolicy="no-referrer-when-downgrade"
				ref={iframeRef}
			/>
		</div>
	)
}
