"use client";
import { AppSidebar } from "@/components/global/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<div className="@container/main min-[56rem]:overflow-y-auto">
					<header className="sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 rounded-t-xl border-b bg-background/90 backdrop-blur-xs transition-[width,height] ease-linear">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
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
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
						{children}
						<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
