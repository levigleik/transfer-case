import { cookies } from "next/headers";
import { AppNavbar } from "@/components/navbar/app-navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sidebarState = (await cookies()).get("sidebar_state")?.value;

	const defaultOpen =
		sidebarState === undefined ? true : sidebarState === "true";
	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<div className="@container/main min-[56rem]:overflow-y-auto">
					<header className="sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 rounded-t-xl border-b bg-background/90 backdrop-blur-xs transition-[width,height] ease-linear">
						<AppNavbar />
					</header>
					<div className="flex flex-col p-6">{children}</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
