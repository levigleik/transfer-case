import { FaUserPlus, FaUsers } from "react-icons/fa6";
import type { IconType } from "react-icons/lib";
import { MdSpaceDashboard } from "react-icons/md";

export type Submenu = {
	href: string;
	labelSubmenu: string;
	icon?: IconType;
};

export type Menu = {
	href: string;
	labelMenu: string;
	icon: IconType;
	submenus?: Submenu[];
};

export type Group = {
	groupLabel: string;
	menus: Menu[];
};

export function getMenuList(): Group[] {
	return [
		{
			groupLabel: "Painel",
			menus: [
				{
					href: "/dashboard",
					labelMenu: "Dashboard",
					icon: MdSpaceDashboard,
					submenus: [],
				},
			],
		},
		{
			groupLabel: "Gerenciamento",
			menus: [
				{
					href: "/users",
					labelMenu: "Usuários",
					icon: FaUsers,
					submenus: [
						{
							href: "/users",
							labelSubmenu: "Todos usuários da vida em um só lugar",
							icon: FaUsers,
						},
						{
							href: "/dashboard",
							labelSubmenu: "Adicionar usuário",
							icon: FaUserPlus,
						},
					],
				},
			],
		},
		{
			groupLabel: "Teste",
			menus: [
				{
					href: "/pretos",
					labelMenu: "TESTE",
					icon: FaUsers,
					submenus: [
						{
							href: "/pretos",
							labelSubmenu: "Todos testes1",
							icon: FaUsers,
						},
						{
							href: "/users/new",
							labelSubmenu: "Adicionar usuário 1",
							icon: FaUserPlus,
						},
					],
				},
			],
		},
	];
}
