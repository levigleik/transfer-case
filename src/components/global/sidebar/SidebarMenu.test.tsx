import { render, screen } from "@testing-library/react";
import { FaChartBar, FaCog, FaHome, FaUser } from "react-icons/fa";
import type { Group } from "@/lib/sidebar-menu-list"; // Supondo que você tenha esse tipo
import * as menuListModule from "@/lib/sidebar-menu-list";
import { SidebarMenu } from "./SidebarMenu";

// Mock do @tanstack/react-router
jest.mock("@tanstack/react-router", () => ({
	useLocation: () => ({
		pathname: "/dashboard", // Simulamos que estamos na rota /dashboard
	}),
}));

// Mock do CollapseMenuButton para simplificar
// Vamos apenas renderizar o label e um testid
jest.mock("@/components/global/sidebar/SidebarCollapseMenu", () => ({
	CollapseMenuButton: (props: { labelMenu: string }) => (
		<div data-testid="mock-collapse-menu">{props.labelMenu}</div>
	),
}));

// Mock dos dados do menu
const mockMenuList: Group[] = [
	{
		groupLabel: "General",
		menus: [
			{ href: "/dashboard", labelMenu: "Dashboard", icon: FaHome },
			{ href: "/analytics", labelMenu: "Analytics", icon: FaChartBar },
			{
				href: "/settings",
				labelMenu: "Settings",
				icon: FaCog,
				submenus: [
					{ href: "/settings/profile", labelSubmenu: "Profile", icon: FaUser },
				],
			},
		],
	},
];

// Usamos jest.spyOn para interceptar a chamada a 'getMenuList'
jest.spyOn(menuListModule, "getMenuList").mockReturnValue(mockMenuList);

describe("SidebarMenu", () => {
	describe("when isOpen is true (expanded)", () => {
		beforeEach(() => {
			render(<SidebarMenu isOpen={true} />);
		});

		it("should render group labels", () => {
			expect(screen.getByText("General")).toBeInTheDocument();
		});

		it("should render menu items with full text", () => {
			expect(screen.getByText("Dashboard")).toBeInTheDocument();
			expect(screen.getByText("Analytics")).toBeInTheDocument();
		});

		it("should render the full 'Sair' (Logout) button", () => {
			// Usamos regex /sair/i para ignorar case
			expect(screen.getByRole("button", { name: /sair/i })).toHaveTextContent(
				"Sair",
			);
		});

		it("should render CollapseMenuButton for items with submenus", () => {
			expect(screen.getByTestId("mock-collapse-menu")).toHaveTextContent(
				"Settings",
			);
		});
	});

	describe("when isOpen is false (collapsed)", () => {
		beforeEach(() => {
			render(<SidebarMenu isOpen={false} />);
		});

		it("should NOT render group labels", () => {
			// queryByText retorna null se não encontrar, ao contrário de getByText
			expect(screen.queryByText("General")).not.toBeInTheDocument();
		});

		it("should NOT render menu items with full text", () => {
			expect(screen.queryByText("Dashboard")).not.toBeInTheDocument();
			expect(screen.queryByText("Analytics")).not.toBeInTheDocument();
		});

		it("should render menu items by title (for icon-only buttons)", () => {
			// No modo colapsado, o texto vira 'title' no botão
			expect(screen.getByTitle("Dashboard")).toBeInTheDocument();
			expect(screen.getByTitle("Analytics")).toBeInTheDocument();
		});

		it("should render the icon-only 'Sair' (Logout) button", () => {
			// O texto "Sair" não está visível, mas o botão (com tooltip) sim
			expect(screen.queryByText("Sair")).not.toBeInTheDocument();
		});

		it("should render CollapseMenuButton (which handles its own collapsed state)", () => {
			expect(screen.getByTestId("mock-collapse-menu")).toHaveTextContent(
				"Settings",
			);
		});
	});
});
