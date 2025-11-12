"use client";
import { cn } from "@heroui/theme";
import { Navbar } from "@/components/global/navbar/Navbar";
import { Sidebar } from "@/components/global/sidebar/Sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import { useStore } from "@/hooks/useStore";

export default function Layout({ children }: { children: React.ReactNode }) {
	const sidebar = useStore(useSidebar, (x) => x);
	if (!sidebar) return null;
	const { isOpen, toggleOpen } = sidebar;

	return (
		<div className="flex flex-col h-screen">
			<Navbar isOpen={isOpen} toggleOpen={toggleOpen} />
			<main
				className={cn(
					"flex flex-1 overflow-hidden",
					// !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72"),
				)}
			>
				<Sidebar />

				<div className="flex-1 overflow-y-auto">
					<div className="flex flex-col max-w-[1352px] p-6 gap-6 md:gap-10 mx-auto">
						{children}
					</div>
				</div>
			</main>
		</div>
	);
}
