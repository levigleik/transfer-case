import { Button } from "@heroui/button";
import { ArrowLeftIcon } from "@heroui/shared-icons";
import { cn } from "@heroui/theme";

interface SidebarToggleProps {
	isOpen: boolean;
	setIsOpen: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
	return (
		<Button
			onPress={() => setIsOpen()}
			className="w-10 h-10 perspective-distant"
			variant="solid"
			isIconOnly
		>
			<ArrowLeftIcon
				className={cn(
					"transition-transform ease-in-out duration-300",
					isOpen ? "rotate-y-0" : "rotate-y-180",
				)}
			/>
		</Button>
	);
}
