import { fireEvent, render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import type { Submenu } from "@/lib/sidebar-menu-list";
import { CollapseMenuButton } from "./SidebarCollapseMenu"; // Ajuste o caminho

// 1. Mock do next/navigation
jest.mock("next/navigation", () => ({
	usePathname: jest.fn(),
}));

// 2. Mock do @heroui/button
// Isso nos permite verificar as props 'variant' e 'isIconOnly'
jest.mock("@heroui/button", () => ({
	Button: jest.fn(({ children, variant, isIconOnly, title, ...props }) => (
		<button
			{...props}
			data-variant={variant} // Expondo a prop variant como um data-attribute
			data-icon-only={isIconOnly} // Expondo a prop isIconOnly
			title={title}
		>
			{children}
		</button>
	)),
}));

// Cast dos mocks para o TypeScript
const mockedUseLocation = jest.mocked(usePathname);

// 3. Setup dos dados de teste
const MockIcon: any = ({ size }: { size: number }) => (
	<div data-testid="mock-icon" data-size={size} />
);

const mockSubmenus: Submenu[] = [
	{ href: "/settings/profile", labelSubmenu: "Profile" },
	{ href: "/settings/billing", labelSubmenu: "Billing" },
];

describe("CollapseMenuButton", () => {
	beforeEach(() => {
		// Limpa mocks antes de cada teste
		jest.clearAllMocks();
		// Define um pathname padrão (inativo)
		mockedUseLocation.mockReturnValue("/dashboard");
	});

	// 4. Testes para o modo Accordion (Sidebar Aberta)
	describe("when isOpen is true (Accordion mode)", () => {
		it("should render an Accordion trigger with the correct label", () => {
			render(
				<CollapseMenuButton
					isOpen={true}
					labelMenu="Settings"
					icon={MockIcon}
					submenus={mockSubmenus}
					hrefMenu="/settings"
				/>,
			);

			// O AccordionItem renderiza um <button> com o título
			const accordionTrigger = screen.getByRole("button", { name: "Settings" });
			expect(accordionTrigger).toBeInTheDocument();
			expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
		});

		it("should render Listbox items when Accordion is clicked", async () => {
			render(
				<CollapseMenuButton
					isOpen={true}
					labelMenu="Settings"
					icon={MockIcon}
					submenus={mockSubmenus}
					hrefMenu="/settings"
				/>,
			);

			// Clica no trigger do Accordion
			fireEvent.click(screen.getByRole("button", { name: "Settings" }));

			// Procura pelo Listbox (que deve aparecer)
			const listbox = await screen.findByRole("listbox");
			expect(listbox).toBeInTheDocument();

			// Procura pelos itens (options) dentro do listbox
			const items = within(listbox).getAllByRole("option");
			expect(items).toHaveLength(2);
			expect(items[0]).toHaveTextContent("Profile");
			expect(items[1]).toHaveTextContent("Billing");
			expect(items[0]).toHaveAttribute("href", "/settings/profile");
		});

		it("should auto-expand and highlight the active item if pathname matches", async () => {
			// Define o pathname para uma sub-rota ativa
			mockedUseLocation.mockReturnValue("/settings/profile");

			render(
				<CollapseMenuButton
					isOpen={true}
					labelMenu="Settings"
					icon={MockIcon}
					submenus={mockSubmenus}
					hrefMenu="/settings"
				/>,
			);

			// O Accordion deve estar expandido por padrão (defaultExpandedKeys)
			// e o Listbox visível
			const listbox = await screen.findByRole("listbox");
			const activeItem = within(listbox).getByRole("option", {
				name: "Profile",
			});
			const inactiveItem = within(listbox).getByRole("option", {
				name: "Billing",
			});

			// Verifica as classes de "ativo" do componente
			expect(activeItem).toHaveClass("bg-default text-default-foreground");
			expect(inactiveItem).not.toHaveClass(
				"bg-default text-default-foreground",
			);
		});
	});

	// 5. Testes para o modo Dropdown (Sidebar Fechada)
	describe("when isOpen is false (Dropdown mode)", () => {
		it("should render an icon-only button with 'light' variant when inactive", () => {
			mockedUseLocation.mockReturnValue("/dashboard"); // Inativo
			render(
				<CollapseMenuButton
					isOpen={false}
					labelMenu="Settings"
					icon={MockIcon}
					submenus={mockSubmenus}
					hrefMenu="/settings"
				/>,
			);

			// O DropdownTrigger renderiza o botão
			const triggerButton = screen.getByRole("button", { name: "Settings" });

			// Verifica se o mock do botão recebeu as props corretas
			expect(triggerButton).toHaveAttribute("data-variant", "light");
			expect(triggerButton).toHaveAttribute("data-icon-only", "true");
		});

		it("should render an icon-only button with 'solid' variant when a submenu is active", () => {
			mockedUseLocation.mockReturnValue("/settings/profile"); // Ativo
			render(
				<CollapseMenuButton
					isOpen={false}
					labelMenu="Settings"
					icon={MockIcon}
					submenus={mockSubmenus}
					hrefMenu="/settings"
				/>,
			);

			const triggerButton = screen.getByRole("button", { name: "Settings" });

			// Verifica se o mock do botão recebeu as props corretas
			expect(triggerButton).toHaveAttribute("data-variant", "solid");
			expect(triggerButton).toHaveAttribute("data-icon-only", "true");
		});

		it("should render DropdownMenu with items when clicked", async () => {
			render(
				<CollapseMenuButton
					isOpen={false}
					labelMenu="Settings"
					icon={MockIcon}
					submenus={mockSubmenus}
					hrefMenu="/settings"
				/>,
			);

			// Clica no botão que ativa o dropdown
			fireEvent.click(screen.getByRole("button", { name: "Settings" }));

			// Procura pelo menu
			const menu = await screen.findByRole("menu");
			expect(menu).toBeInTheDocument();

			// Procura pelos itens dentro do menu
			const items = within(menu).getAllByRole("menuitem");
			expect(items).toHaveLength(2);
			expect(items[0]).toHaveTextContent("Profile");
			expect(items[1]).toHaveTextContent("Billing");
		});
	});
});
