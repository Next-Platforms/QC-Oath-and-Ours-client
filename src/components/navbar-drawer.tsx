import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import Logo from '../icons/logo.svg'
import { LINEUrl } from '../constants'

const links = [
	{
		title: 'スタジオ紹介',
		subtitle: 'STUDIO',
		href: '/studio'
	},
	{
		title: 'ギャラリー',
		subtitle: 'GALLERY',
		href: '/gallery'
	},
	{
		title: 'コラム',
		subtitle: 'COLUMN',
		href: '/column'
	}
]

const NavbarDrawer = () => {
	return (
		<Drawer direction="left">
			<DrawerTrigger asChild>
				<button>
					<img className="h-6 w-10" src="/hamburger.svg" />
				</button>
			</DrawerTrigger>
			<DrawerContent className="h-full w-full max-w-[375px] rounded-none" includeHandle={false}>
				<div className="flex h-full flex-col items-center justify-center gap-[44px] px-6">
					<a
						className="h-[45px] w-[192px] shrink-0 hover:opacity-70 focus-visible:opacity-70"
						href="/"
					>
						<img className="h-full w-full" src={Logo.src} />
					</a>
					{links.map((link) => {
						return (
							<a
								className="flex flex-col items-center gap-1 text-center"
								href={link.href}
								key={link.title}
							>
								<span className="text-base font-bold leading-[19px]">{link.title}</span>
								<span className="text-base leading-[19px] text-[#D7D7D7] english">
									{link.subtitle}
								</span>
							</a>
						)
					})}
					<a
						className="focus-visible:dark-lime flex h-[80px] w-full items-center justify-center bg-lime px-6 text-center text-white hover:bg-dark-lime"
						href={LINEUrl}
					>
						<p className="text-base font-bold leading-[19px]">
							<span className="text-[18px] leading-[21px] english">LINE</span>で<br />
							問い合わせる
						</p>
					</a>
				</div>
			</DrawerContent>
		</Drawer>
	)
}

export default NavbarDrawer
