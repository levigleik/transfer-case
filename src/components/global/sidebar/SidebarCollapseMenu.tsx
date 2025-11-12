import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@heroui/dropdown";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { cn } from "@heroui/theme";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { IconType } from "react-icons/lib";
import type { Submenu } from "@/lib/sidebar-menu-list";

interface CollapseMenuButtonProps {
	icon: IconType;
	labelMenu: string;
	submenus: Submenu[];
	isOpen?: boolean;
	hrefMenu: string;
}

export function CollapseMenuButton({
	icon: Icon,
	labelMenu,
	submenus,
	isOpen,
	hrefMenu,
}: CollapseMenuButtonProps) {
	const pathname = usePathname();
	const isSubmenuActive = submenus.some((submenu) => submenu.href === pathname);
	const [selectedKeys] = useState(
		new Set([pathname.startsWith(hrefMenu ?? "") ? (hrefMenu ?? "") : ""]),
	);

	return isOpen ? (
		<Accordion defaultExpandedKeys={selectedKeys} variant="shadow">
			<AccordionItem
				startContent={<Icon size={18} />}
				classNames={{
					trigger: "cursor-pointer",
				}}
				title={labelMenu}
				aria-label={labelMenu}
				textValue={labelMenu}
				key={hrefMenu}
			>
				<Listbox aria-label="Submenus" selectionMode="single">
					{submenus.map(({ href, labelSubmenu }) => (
						<ListboxItem
							key={href}
							startContent={<Icon size={18} />}
							href={href}
							className={cn(
								pathname.startsWith(href ?? "")
									? "bg-default text-default-foreground"
									: "",
								"w-full flex",
							)}
							title={labelSubmenu}
						>
							{labelSubmenu}
						</ListboxItem>
					))}
				</Listbox>
			</AccordionItem>
		</Accordion>
	) : (
		<Dropdown placement="right-start">
			<DropdownTrigger>
				{isOpen ? (
					<Button
						variant={isSubmenuActive ? "solid" : "light"}
						className=" justify-start min-w-auto"
						startContent={<Icon size={18} />}
						title={labelMenu}
					>
						{labelMenu}
					</Button>
				) : (
					<Button
						variant={isSubmenuActive ? "solid" : "light"}
						className=""
						isIconOnly
						title={labelMenu}
					>
						<Icon size={18} />
					</Button>
				)}
			</DropdownTrigger>
			<DropdownMenu selectedKeys={new Set([`/${pathname}`])}>
				{submenus.map(({ href, labelSubmenu }) => (
					<DropdownItem key={href ?? ""} title={labelSubmenu} href={href} />
				))}
			</DropdownMenu>
		</Dropdown>
	);
}
