import { SearchCommand } from "@/components/navbar/search-command";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppNavbar() {
	return (
		<div className="flex w-full items-center justify-between px-4 @4xl/main:px-6">
			<div className="flex items-center gap-1">
				<SidebarTrigger className="-ml-1 rounded-full size-9 [&>svg]:text-muted-foreground/80 hover:[&>svg]:text-foreground" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>Transfer</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="hidden @4xl/main:block">
				<SearchCommand />
			</div>
		</div>
	);
}
