import { SidebarMenu } from "@/components/global/sidebar/SidebarMenu";
import { useSidebar } from "@/hooks/useSidebar";
import { useStore } from "@/hooks/useStore";

export function Sidebar() {
	const sidebar = useStore(useSidebar, (x) => x);
	if (!sidebar) return null;
	const { isOpen } = sidebar;
	return <SidebarMenu isOpen={isOpen} />;
}
