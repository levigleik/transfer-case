import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { cn } from "@heroui/theme";
import { Tooltip } from "@heroui/tooltip";
import { usePathname } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { CollapseMenuButton } from "@/components/global/sidebar/SidebarCollapseMenu";
import { getMenuList } from "@/lib/sidebar-menu-list";

interface MenuProps {
	isOpen: boolean;
}

export function SidebarMenu({ isOpen }: MenuProps) {
	const pathname = usePathname();
	const menuList = getMenuList();

	return (
		<div
			className={cn(
				"hidden lg:flex w-72 flex-col border-r border-gray-700 overflow-y-auto",
				"transition-all ease-in-out duration-300 h-[calc(100dvh-4.25rem)]",
				!isOpen ? "w-[90px]" : "w-72",
			)}
		>
			<ul className={cn("flex flex-col h-full px-3 py-5 items-start gap-5")}>
				{menuList.map(({ groupLabel, menus }) => (
					<li
						className={cn("w-full flex flex-col", !isOpen && "items-center")}
						key={groupLabel}
					>
						{isOpen && groupLabel ? (
							<p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
								{groupLabel}
							</p>
						) : (
							<p />
						)}
						{menus.map(({ href, labelMenu, icon: Icon, submenus }) =>
							!submenus?.length ? (
								<Tooltip
									key={href}
									delay={100}
									content={labelMenu}
									className={cn(isOpen && "hidden")}
									placement="right"
								>
									{isOpen ? (
										<Button
											variant={
												pathname.startsWith(href ?? "") ? "solid" : "light"
											}
											className="w-full justify-start items-center"
											startContent={<Icon size={18} />}
											as={Link}
											href={href}
										>
											{labelMenu}
										</Button>
									) : (
										<Button
											variant={
												pathname.startsWith(href ?? "") ? "solid" : "light"
											}
											// className="w-full"
											isIconOnly
											as={Link}
											href={href}
											title={labelMenu}
										>
											<Icon size={18} />
										</Button>
									)}
								</Tooltip>
							) : (
								<CollapseMenuButton
									key={href}
									icon={Icon}
									labelMenu={labelMenu}
									submenus={submenus}
									isOpen={isOpen}
									hrefMenu={href}
								/>
							),
						)}
					</li>
				))}
				<li
					className={cn(
						"w-full grow flex items-end py-3",
						!isOpen && "justify-center",
					)}
				>
					<Tooltip
						delay={100}
						content="Sair"
						className={isOpen ? "hidden" : ""}
						placement="right"
					>
						{isOpen ? (
							<Button
								onPress={() => {
									// signOut();
								}}
								startContent={<FaSignOutAlt size={18} />}
								variant="solid"
								className="w-full"
							>
								Sair
							</Button>
						) : (
							<Button
								onPress={() => {
									// signOut();
								}}
								variant="solid"
								isIconOnly
							>
								<FaSignOutAlt size={18} />
							</Button>
						)}
					</Tooltip>
				</li>
			</ul>
		</div>
	);
}
