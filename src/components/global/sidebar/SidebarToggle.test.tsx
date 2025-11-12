import { fireEvent, render, screen } from "@testing-library/react";
import { SidebarToggle } from "./SidebarToggle"; // Ajuste o caminho se necessário

// Mock do componente de ícone para focar no teste do SidebarToggle
// Estamos simulando o componente e apenas passando a 'className'
// e adicionando um data-testid para facilitar a seleção.
jest.mock("@heroui/shared-icons", () => ({
	ArrowBarsHorizontal: ({ className }: { className: string }) => (
		<div data-testid="mock-arrow-icon" className={className} />
	),
}));

describe("SidebarToggle", () => {
	// Criamos uma função mock para 'setIsOpen'
	const mockSetIsOpen = jest.fn();

	// Resetamos o mock antes de cada teste
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render the button", () => {
		render(<SidebarToggle isOpen={true} setIsOpen={mockSetIsOpen} />);
		// Verifica se o botão está em tela
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("should call setIsOpen when clicked", () => {
		render(<SidebarToggle isOpen={true} setIsOpen={mockSetIsOpen} />);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		// Verifica se a função mock foi chamada exatamente 1 vez
		expect(mockSetIsOpen).toHaveBeenCalledTimes(1);
	});

	it("should have correct classes when isOpen is true", () => {
		render(<SidebarToggle isOpen={true} setIsOpen={mockSetIsOpen} />);

		const icon = screen.getByTestId("mock-arrow-icon");

		// Verifica se a classe de "aberto" está presente
		expect(icon).toHaveClass("rotate-y-0");
		// Verifica se a classe de "fechado" NÃO está presente
		expect(icon).not.toHaveClass("rotate-y-180");
	});

	it("should have correct classes when isOpen is false", () => {
		render(<SidebarToggle isOpen={false} setIsOpen={mockSetIsOpen} />);

		const icon = screen.getByTestId("mock-arrow-icon");

		// Verifica se a classe de "fechado" está presente
		expect(icon).toHaveClass("rotate-y-180");
		// Verifica se a classe de "aberto" NÃO está presente
		expect(icon).not.toHaveClass("rotate-y-0");
	});
});
