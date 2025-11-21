"use client";
import { NuqsProvider } from "@/providers/nuqs-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClientProvider } from "./query-client-provider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<NuqsProvider>{children}</NuqsProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
