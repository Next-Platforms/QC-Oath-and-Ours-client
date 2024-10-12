import { useMemo, useState } from 'react'
import NextArrow from '../../../icons/next-arrow.svg'
import BackArrow from '../../../icons/back-arrow.svg'

const VoiceCard = ({ body, author }: { body: string; author: string }) => {
	return (
		<div className="flex w-full max-w-[400px] shrink-0 flex-col rounded-xl bg-white p-5">
			<img className="h-[240px] w-full" src="/hero.jpg" />
			<p className="mt-[26px] text-base leading-[33px] md:mt-7">{body}</p>
			<span className="ml-auto mt-[26px] inline-block max-w-max text-base">
				洋装スタジオプラン
				{author}
			</span>
		</div>
	)
}

const allItems = new Array(10)
	.fill({
		body: 'スタジオ撮影は堅苦しいイメージが多かったのですが、このフォトスタジオでは背景も沢山あってスタッフの方々のおかげで終始笑顔で楽しく撮ることができました！ドレスも豊富にあり、メイクも想像以上に可愛く仕上げて下さいました！',
		author: '洋装スタジオプラン'
	})
	.map((item, idx) => ({ ...item, body: `${idx} - ${item.body}` }))

export const VoiceCards = () => {
	const [start, setStart] = useState(0)

	const items = useMemo(() => allItems.slice(start), [start])

	return (
		<div className="mx-auto flex flex-col page-container">
			<div className="flex w-full flex-col-reverse items-end justify-between gap-[74px] pr-[10px] md:flex-row md:gap-0 md:pr-0">
				<div className="flex items-center gap-[10px]">
					<button
						className="inline-flex aspect-square h-auto w-[60px] items-center justify-center rounded-full bg-black text-white"
						onClick={() => {
							setStart(start - 1)
						}}
						disabled={start <= 0}
					>
						<img src={BackArrow.src} className="h-[15.5996px] w-[13.5px]" />
					</button>
					<button
						className="inline-flex aspect-square h-auto w-[60px] items-center justify-center rounded-full bg-black text-white"
						onClick={() => {
							setStart(start + 1)
						}}
						disabled={start >= allItems.length - 1}
					>
						<img src={NextArrow.src} className="h-[15.5996px] w-[13.5px]" />
					</button>
				</div>
				<div className="flex flex-col items-center self-end">
					<h2 className="text-[70px] font-semibold leading-[84px] text-[#333333] md:text-[93px]">
						VOICE
					</h2>
					<div className="flex w-full items-center gap-4">
						<span className="h-1 w-full bg-[#333333]"></span>
						<p className="shrink-0 text-[20px] md:text-[35px]">お客様の声</p>
					</div>
				</div>
			</div>
			<div className="mt-[26px] flex items-start gap-5 overflow-hidden px-5">
				{items.map((item, idx) => {
					return <VoiceCard key={idx} body={item.body} author={item.author} />
				})}
			</div>
		</div>
	)
}
