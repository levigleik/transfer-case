import { HeroUIProvider } from "@heroui/react";
import QueryClientProvider from "./QueryClientProvider";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider>
			<HeroUIProvider>{children}</HeroUIProvider>
		</QueryClientProvider>
	);
}
