import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
	NavbarContent,
	Navbar as NavbarHeroUI,
	NavbarItem,
} from "@heroui/navbar";
import { cn } from "@heroui/theme";
import { SidebarToggle } from "@/components/global/sidebar/SidebarToggle";

export function Navbar({
	isOpen,
	toggleOpen,
}: {
	isOpen: boolean;
	toggleOpen: () => void;
}) {
	return (
		<NavbarHeroUI
			classNames={{
				base: "border border-transparent border-b-gray-700",
				wrapper:
					"max-w-full border-b-gray-700 border border-transparent px-3 pl-0",
			}}
		>
			<div className="flex px-[23px] gap-6">
				{/*<div className="flex justify-center xl:w-[90px] w-[79px]">*/}
				<SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
				{/*</div>*/}
				<Link href="/dashboard" className="flex items-center gap-2">
					{/*<Image*/}
					{/*	src={logo}*/}
					{/*	alt="Logo"*/}
					{/*	className={cn("w-14 h-14", !isOpen && "h-10")}*/}
					{/*/>*/}

					<h1
						className={cn(
							"font-bold text-lg whitespace-nowrap transition-all",
							"ease-in-out duration-300",
						)}
					>
						Simple CRUD
					</h1>
				</Link>
			</div>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<Link href="/login">Login</Link>
				</NavbarItem>
				<NavbarItem>
					<Link as={Button} color="primary" href="/login" variant="flat">
						Sign Up
					</Link>
				</NavbarItem>
			</NavbarContent>
		</NavbarHeroUI>
	);
}
