import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'

const NavbarDrawer = () => {
	return (
		<Drawer direction="left">
			<DrawerTrigger asChild>
				<button>
					<img className="h-6 w-10" src="/hamburger.svg" />
				</button>
			</DrawerTrigger>
			<DrawerContent
				className="h-full w-full max-w-[375px] rounded-none"
				includeHandle={false}
			></DrawerContent>
		</Drawer>
	)
}

export default NavbarDrawer
