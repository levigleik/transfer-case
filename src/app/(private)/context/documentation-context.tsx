"use client";

import type { ReactNode } from "react";
import * as React from "react";
import type { DocumentationType } from "@/types/models";

type DocumentationFormContextValue = {
	editingDocumentations?: DocumentationType[];
	setEditingDocumentations: (v?: DocumentationType[]) => void;
};

const DocumentationFormContext = React.createContext<
	DocumentationFormContextValue | undefined
>(undefined);

export function DocumentationFormProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [editingDocumentations, setEditingDocumentations] = React.useState<
		DocumentationType[] | undefined
	>(undefined);

	const value = React.useMemo(
		() => ({
			editingDocumentations,
			setEditingDocumentations,
		}),
		[editingDocumentations],
	);

	return (
		<DocumentationFormContext.Provider value={value}>
			{children}
		</DocumentationFormContext.Provider>
	);
}

export function useDocumentationFormContext() {
	const ctx = React.useContext(DocumentationFormContext);
	if (!ctx) {
		throw new Error(
			"useDocumentationFormContext must be used within a DocumentationFormProvider",
		);
	}
	return ctx;
}
