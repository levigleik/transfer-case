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
import type { VehicleData } from "@/app/(private)/utils/types-vehicle";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
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
				query: `where.vehicleId=${vehicleId}`,
			}),
		enabled: !!vehicleId,
	});

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

			<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				<Button variant="outline">Cancel</Button>
				<Button type="button" onClick={onSubmit} disabled={!editingVehicle?.id}>
					Save changes
				</Button>
			</div>
		</>
	);
}
