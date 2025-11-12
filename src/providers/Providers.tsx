"use client";
import { HeroUIProvider } from "@/providers/HeroUIProvider";
import { NuqsProvider } from "@/providers/NuqsProvider";
import { QueryClientProvider } from "./QueryClientProvider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider>
			<NuqsProvider>
				<HeroUIProvider>{children}</HeroUIProvider>
			</NuqsProvider>
		</QueryClientProvider>
	);
}
