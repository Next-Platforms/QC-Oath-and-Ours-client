import { useEffect, useRef, useState } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import NextArrow from '../../../icons/next-arrow.svg'
import BackArrow from '../../../icons/back-arrow.svg'
import { cn } from '../../../lib/utils'
import { useMediaQuery } from '../../../hooks/use-media-query'

const VoiceCard = ({
	body,
	author,
	image,
	className,
	...rest
}: HTMLMotionProps<'div'> & { body: string; author: string; image: string }) => {
	return (
		<motion.div
			{...rest}
			className={cn('flex h-max shrink-0 flex-col rounded-xl bg-white p-5', className)}
		>
			<img className="h-[240px] w-full object-cover" src={image} />
			<p className="mt-[26px] text-base leading-[33px] md:mt-7">{body}</p>
			<span className="ml-auto mt-[26px] inline-block max-w-max text-base">
				洋装スタジオプラン
				{author}
			</span>
		</motion.div>
	)
}

const allItems = [
	{
		image: './voice-cards/1.jpg',
		body: 'スタジオ撮影は堅苦しいイメージが多かったのですが、このフォトスタジオでは背景も沢山あってスタッフの方々のおかげで終始笑顔で楽しく撮ることができました！ドレスも豊富にあり、メイクも想像以上に可愛く仕上げて下さいました！',
		author: '洋装スタジオプラン'
	},
	{
		image: './voice-cards/2.jpg',
		body: 'スタッフさんが常に笑顔で、カメラマンさんの掛け声も楽しく、こちらも自然と笑顔になる撮影ができました。あまり撮られ慣れないので不安でしたが、スタッフさん達のお陰で自然に笑え、楽しく写真を撮ってもらうことができました！ありがとうございます。今後も機会があれば利用したいと思いました。',
		author: '洋装ロケーションプラン'
	},
	{
		image: './voice-cards/3.jpg',
		body: 'ウエディングフォトを撮って頂きました。スタッフの皆さんとても丁寧で明るく、3箇所のロケという大変な中ずっと笑顔で接して頂き、夫婦共々本当に楽しかったです。また、私達の希望カットを全て撮って頂けて本当に嬉しかったです。データが来るのが楽しみです。本当にスタッフの皆様ありがとうございました。',
		author: '洋装ロケーションプラン'
	},
	{
		image: './voice-cards/4.jpg',
		body: '式を挙げないので家族が揃って本当に貴重な時間になりました。家族もみんな良いお店だねと喜んでました！写真も沢山撮らせていただいてありがとうございました！',
		author: '和装ロケーションプラン'
	},
	{
		image: './voice-cards/5.jpg',
		body: '内山邸での撮影でした！桜とっても綺麗な時で桜といっぱい撮らしていただきました！スタッフのみなさんもとっても親切でカメラさんも面白い方で自然に笑顔なりました！和装でしたが無理なく撮影できました！',
		author: '和装ロケーションプラン'
	},
	{
		image: './voice-cards/6.jpg',
		body: 'フォトウェディングのスタジオ撮影で利用させて頂きました。スタッフの方、メイク担当の方、カメラマンの方、皆さん本当に気さくで…終始楽しく撮影することができました！両家家族揃って写真撮影もでき、本当に素敵な1日になりました。',
		author: '洋装スタジオプラン'
	},
	{
		image: './voice-cards/7.jpg',
		body: '今日は本当にありがとうございました。とても楽しくて素敵な1日になりました！スタッフの皆様のおかげで、本当に最後まで楽しかったです。また機会があれば利用させて頂きたいと思っています！',
		author: '洋装ロケーションプラン'
	},
	{
		image: './voice-cards/8.jpg',
		body: '長時間お疲れ様でした！！！サプライズも上手くいって本当に良かったです。素敵なフォトウェディングにしてくださってありがとうございました！写真と動画もありがとうございます！甥っ子との写真もあるの凄く嬉しいです。 また画像編集したものくるの楽しみにしてます〜！',
		author: '和装スタジオプラン'
	}
].map((item, idx) => ({ ...item, body: `${idx} - ${item.body}` }))

const clampTo = (curr: number) => {
	const min = 0
	const max = allItems.length - 1

	if (curr < min) {
		return Math.min(max, allItems.length - (min - curr))
	}

	if (curr > max) {
		return Math.max(min, min + Math.abs(allItems.length - curr))
	}

	return curr
}

const gap = 20

export const VoiceCards = () => {
	const [start, setStart] = useState(0)
	const [transition, setTransition] = useState(0.3)

	const animatingFor = useRef<number | undefined>()
	const [animating, setAnimating] = useState(false)

	const handleAnimationChange = (x: number | undefined) => {
		if (x === undefined) {
			animatingFor.current = undefined
			setAnimating(false)
		} else {
			animatingFor.current = x
			setAnimating(true)
		}
	}

	const handleStartChange = (val: number) => {
		setStart(val)
		setTransition(0.3)
	}

	const isMobile = useMediaQuery('md')
	const size = isMobile ? 335 : 400

	useEffect(() => {
		if (allItems.length <= 0 || animating || animatingFor.current !== undefined) return

		if (start < allItems.length && start >= 0) return

		setStart(clampTo(start))
		setTransition(0)
	}, [start, animating])

	return (
		<div className="mx-auto flex flex-col">
			<div className="mx-auto flex w-full flex-col-reverse items-end justify-between gap-[74px] pr-[10px] page-container md:flex-row md:gap-0 md:pr-0">
				<div className="flex items-center gap-[10px]">
					<button
						className="group inline-flex aspect-square h-auto w-[60px] items-center justify-center overflow-hidden rounded-full border border-black bg-black text-white transition hover:bg-white"
						onClick={() => {
							handleStartChange(start - 1)
						}}
					>
						<img
							src={BackArrow.src}
							className="h-[15.5996px] w-[13.5px] transition-all group-hover:invert"
						/>
					</button>
					<button
						className="group inline-flex aspect-square h-auto w-[60px] items-center justify-center overflow-hidden rounded-full border border-black bg-black text-white transition hover:bg-white"
						onClick={() => {
							handleStartChange(start + 1)
						}}
					>
						<img
							src={NextArrow.src}
							className="h-[15.5996px] w-[13.5px] transition-all group-hover:invert"
						/>
					</button>
				</div>
				<div className="flex flex-col items-center self-end">
					<h2 className="english text-[70px] font-semibold leading-[84px] text-[#333333] md:text-[93px]">
						VOICE
					</h2>
					<div className="flex w-full items-center gap-4">
						<span className="h-[0.08rem] w-full bg-[#333333]"></span>
						<p className="shrink-0 text-[20px] md:text-[35px]">お客様の声</p>
					</div>
				</div>
			</div>
			<div className="relative mt-[26px] flex h-[600px] w-[1260px] max-w-[100vw] items-start overflow-hidden px-5 xl:max-w-[1260px]">
				<motion.div
					className="absolute inset-0 w-max"
					initial={false}
					animate={{ x: ((size + gap) * allItems.length + (size + gap) * start) * -1 }}
					transition={{ duration: transition }}
					onAnimationStart={({ x }: { x: number }) => {
						if (!transition) return
						handleAnimationChange(x)
					}}
					onAnimationComplete={({ x }: { x: number }) => {
						if (x === animatingFor.current) {
							handleAnimationChange(undefined)
						}
					}}
				>
					{[...allItems, ...allItems, ...allItems].map((item, idx) => {
						const offset = (size + gap) * idx

						return (
							<VoiceCard
								body={item.body}
								author={item.author}
								image={item.image}
								className="absolute inset-0 max-h-max"
								animate={{
									x: offset
								}}
								style={{ width: size }}
							/>
						)
					})}
				</motion.div>
			</div>
		</div>
	)
}
