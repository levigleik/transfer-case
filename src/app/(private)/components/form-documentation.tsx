"use client";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import {
	type DocumentationColumnActions,
	getDocumentationColumns,
} from "@/app/(private)/components/columns-table-documentation";
import { ModalDeleteDocumentation } from "@/app/(private)/components/modal-delete-documentation";
import { ModalFormDocumentation } from "@/app/(private)/components/modal-form-documentation";
import { useDocumentationFormContext } from "@/app/(private)/context/documentation-context";
import { useModalContext } from "@/app/(private)/context/modal-context";
import { useVehicleFormContext } from "@/app/(private)/context/vehicle-context";
import type { DocumentationData } from "@/app/(private)/utils/types-documentation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DialogFooter } from "@/components/ui/dialog";
import { getData } from "@/lib/functions.api";

export function FormDocumentation() {
	const { setEditingDocumentation } = useDocumentationFormContext();
	const { editingVehicle } = useVehicleFormContext();

	const { setTabPanel } = useModalContext();

	const [isModalFormOpen, setIsModalFormOpen] = useState(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

	const onSubmit = () => {
		setTabPanel("gas-supply");
	};

	const vehicleId = editingVehicle?.id;

	const { data: dataDocumentation, isLoading } = useQuery({
		queryKey: ["documentation-get", vehicleId],
		queryFn: ({ signal }) =>
			getData<DocumentationData[]>({
				url: "/documentation",
				signal,
				query: `where.vehicleId=${vehicleId}&&include.file=true`,
			}),
		enabled: !!vehicleId,
	});

	// const _setIsModalFormOpen = useCallback(
	// 	(open: boolean) => {
	// 		setIsModalFormOpen(open);
	// 		if (!open) {
	// 			setEditingDocumentation(undefined);
	// 		}
	// 	},
	// 	[setEditingDocumentation],
	// );

	const openEditModal = useCallback(
		(documentation: DocumentationData) => {
			setEditingDocumentation(documentation);
			console.log("doc", documentation);
			setIsModalFormOpen(true);
		},
		[setEditingDocumentation],
	);

	const handleOpenDeleteModal = useCallback(
		(documentation?: DocumentationData) => {
			setEditingDocumentation(documentation);
			setIsModalDeleteOpen(true);
		},
		[setEditingDocumentation],
	);

	const actions: DocumentationColumnActions = useMemo(
		() => ({
			onEdit: openEditModal,
			onDelete: handleOpenDeleteModal,
		}),
		[openEditModal, handleOpenDeleteModal],
	);

	const columns = useMemo(() => getDocumentationColumns(actions), [actions]);

	return (
		<>
			<div className="space-y-5 p-6">
				<DataTable
					loading={isLoading}
					columns={columns}
					data={dataDocumentation ?? []}
				/>
				<Button type="button" onClick={() => setIsModalFormOpen(true)}>
					Adicionar documentação
				</Button>

				<ModalFormDocumentation
					open={isModalFormOpen}
					setOpen={setIsModalFormOpen}
				/>

				<ModalDeleteDocumentation
					open={isModalDeleteOpen}
					setOpen={setIsModalDeleteOpen}
				/>
			</div>
			<div className="flex gap-2 sm:flex-row sm:justify-end flex-row justify-between! border-t rounded-b-xl px-6 py-4">
				<Button variant="outline">Cancelar</Button>
				<Button type="button" onClick={onSubmit} disabled={!editingVehicle?.id}>
					Continuar
				</Button>
			</div>
		</>
	);
}
