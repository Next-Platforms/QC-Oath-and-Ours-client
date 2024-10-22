import { useMediaQuery } from '../../../hooks/use-media-query'
import { cn } from '../../../lib/utils'

export const ImageHeaderImg = ({
	image,
	mobileImage,
	alt,
	imgClassName
}: {
	image?: string | undefined
	mobileImage?: string | undefined
	alt: string
	imgClassName?: string
}) => {
	const isMobile = useMediaQuery('md')

	return (
		<img
			src={isMobile ? mobileImage : image}
			className={cn(
				'h-full w-full rounded-[inherit] rounded-b-[50px] object-cover object-top md:rounded-b-[250px]',
				imgClassName
			)}
			alt={alt}
			id="image-header"
		/>
	)
}
