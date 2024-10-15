import { useMemo, useState } from 'react'
import NextArrow from '../../../icons/next-arrow.svg'
import BackArrow from '../../../icons/back-arrow.svg'

const VoiceCard = ({ body, author, image }: { body: string; author: string; image: string }) => {
	return (
		<div className="flex w-full max-w-[400px] shrink-0 flex-col rounded-xl bg-white p-5">
			<img className="h-[240px] w-full object-cover" src={image} />
			<p className="mt-[26px] text-base leading-[33px] md:mt-7">{body}</p>
			<span className="ml-auto mt-[26px] inline-block max-w-max text-base">
				洋装スタジオプラン
				{author}
			</span>
		</div>
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

export const VoiceCards = () => {
	const [start, setStart] = useState(0)

	const items = useMemo(() => {
		const res = []
		let i = start
		while (res.length < allItems.length) {
			const item = allItems[i]
			if (item) {
				res.push(item)
			} else {
				console.error('couldnt find voice item')
				break
			}
			i = (i + 1) % allItems.length
		}
		return res
	}, [start])

	const handleStartChange = (val: number) => {
		if (val < 0) {
			setStart(items.length - 1)
		} else if (val >= allItems.length) {
			setStart(0)
		} else {
			setStart(val)
		}
	}

	return (
		<div className="mx-auto flex flex-col">
			<div className="mx-auto flex w-full flex-col-reverse items-end justify-between gap-[74px] pr-[10px] page-container md:flex-row md:gap-0 md:pr-0">
				<div className="flex items-center gap-[10px]">
					<button
						className="inline-flex aspect-square h-auto w-[60px] items-center justify-center rounded-full bg-black text-white"
						onClick={() => {
							handleStartChange(start - 1)
						}}
					>
						<img src={BackArrow.src} className="h-[15.5996px] w-[13.5px]" />
					</button>
					<button
						className="inline-flex aspect-square h-auto w-[60px] items-center justify-center rounded-full bg-black text-white"
						onClick={() => {
							handleStartChange(start + 1)
						}}
					>
						<img src={NextArrow.src} className="h-[15.5996px] w-[13.5px]" />
					</button>
				</div>
				<div className="flex flex-col items-center self-end">
					<h2 className="text-[70px] font-semibold leading-[84px] text-[#333333] english md:text-[93px]">
						VOICE
					</h2>
					<div className="flex w-full items-center gap-4">
						<span className="h-[0.08rem] w-full bg-[#333333]"></span>
						<p className="shrink-0 text-[20px] md:text-[35px]">お客様の声</p>
					</div>
				</div>
			</div>
			<div className="mt-[26px] flex max-w-[100vw] items-start gap-5 overflow-hidden px-5 page-container xl:max-w-[1260px]">
				{items.map((item, idx) => {
					return <VoiceCard key={idx} body={item.body} author={item.author} image={item.image} />
				})}
			</div>
		</div>
	)
}
