import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SidebarStore = {
	// state: "collapsed" | "expanded";
	// setState: (state: "collapsed" | "expanded") => void;
	// isMobile: boolean;
	// setIsMobile: (isMobile: boolean) => void;
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	// toggleSidebar: () => void;
};

export const useSidebar = create(
	persist<SidebarStore>(
		(set, get) => ({
			// state: "expanded",
			// setState: (state) => set({ state }),
			open: false,
			setOpen: (open: boolean) => {
				set({ open });
			},
			// isMobile: true,
			// setIsMobile: (isMobile) => ({
			// 	isMobile,
			// }),
			openMobile: false,
			setOpenMobile: (openMobile) => {
				set({ openMobile });
			},
			// toggleSidebar: () => {
			// 	if (get().isMobile) set({ openMobile: !get().openMobile });
			// 	else set({ open: !get().open });
			// },
		}),
		{
			name: "sidebar",
			// storage: createJSONStorage(() => localStorage),
			skipHydration: true,
		},
	),
);
