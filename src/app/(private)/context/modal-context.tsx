"use client";

import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { type ReactNode, useCallback } from "react";
import { useDocumentationFormContext } from "@/app/(private)/context/documentation-context";
import { useVehicleFormContext } from "@/app/(private)/context/vehicle-context";
import type { VehicleData } from "@/app/(private)/utils/types-vehicle";

type ModalContextValue = {
	isModalOpen: boolean;
	setIsModalOpen: (open: boolean) => void;
	openWithVehicle: (vehicle?: VehicleData) => void;
	tabPanel: string;
	setTabPanel: (value: string) => void;
};

const ModalContext = React.createContext<ModalContextValue | undefined>(
	undefined,
);

export function ModalProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient();
	const { setEditingVehicle } = useVehicleFormContext();
	const { setEditingDocumentation } = useDocumentationFormContext();
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const [tabPanel, setTabPanel] = React.useState("general-data");

	const openWithVehicle = React.useCallback(
		(vehicle?: VehicleData) => {
			setEditingVehicle(vehicle);
			setIsModalOpen(true);
		},
		[setEditingVehicle],
	);

	const _setIsModalOpen = useCallback(
		(open: boolean) => {
			setIsModalOpen(open);
			if (!open) {
				setEditingVehicle(undefined);
				setEditingDocumentation(undefined);
				setTabPanel("general-data");
				queryClient.invalidateQueries({ queryKey: ["vehicle-get"] });
			}
		},
		[queryClient, setEditingVehicle, setEditingDocumentation],
	);

	const value = React.useMemo(
		() => ({
			isModalOpen,
			setIsModalOpen: _setIsModalOpen,
			openWithVehicle,
			tabPanel,
			setTabPanel,
		}),
		[isModalOpen, openWithVehicle, tabPanel, _setIsModalOpen],
	);

	return (
		<ModalContext.Provider value={value}>{children}</ModalContext.Provider>
	);
}

export function useModalContext() {
	const ctx = React.useContext(ModalContext);
	if (!ctx) {
		throw new Error(
			"useModalContext must be used within a VehicleFormProvider",
		);
	}
	return ctx;
}
