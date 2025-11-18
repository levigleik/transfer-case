"use client";

import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { type ReactNode, useCallback } from "react";
import type { VehicleData } from "@/app/(private)/utils/types";

type VehicleFormContextValue = {
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
	openWithVehicle: (vehicle?: VehicleData) => void;

	editingVehicle?: VehicleData;
	setEditingVehicle: (v?: VehicleData) => void;

	tabPanel: string;
	setTabPanel: (value: string) => void;
};

const VehicleFormContext = React.createContext<
	VehicleFormContextValue | undefined
>(undefined);

export function VehicleFormProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [editingVehicle, setEditingVehicle] = React.useState<
		VehicleData | undefined
	>(undefined);
	const [tabPanel, setTabPanel] = React.useState("general-data");

	const openWithVehicle = React.useCallback((vehicle?: VehicleData) => {
		setEditingVehicle(vehicle);
		setIsModalOpen(true);
	}, []);

	const _setIsModalOpen = useCallback(
		(open: boolean) => {
			setIsModalOpen(open);
			if (!open) {
				setEditingVehicle(undefined);
				setTabPanel("general-data");
				queryClient.invalidateQueries({ queryKey: ["vehicle-get"] });
			}
		},
		[queryClient],
	);

	const value = React.useMemo(
		() => ({
			isModalOpen,
			setIsModalOpen: _setIsModalOpen,
			openWithVehicle,
			editingVehicle,
			setEditingVehicle,
			tabPanel,
			setTabPanel,
		}),
		[isModalOpen, openWithVehicle, editingVehicle, tabPanel, _setIsModalOpen],
	);

	return (
		<VehicleFormContext.Provider value={value}>
			{children}
		</VehicleFormContext.Provider>
	);
}

export function useVehicleFormContext() {
	const ctx = React.useContext(VehicleFormContext);
	if (!ctx) {
		throw new Error(
			"useVehicleFormContext must be used within a VehicleFormProvider",
		);
	}
	return ctx;
}
