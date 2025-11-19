"use client";
import { ChevronDown, CloudDownload, RotateCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
	type DocumentationColumnActions,
	getDocumentationColumns,
} from "@/app/(private)/components/columns-table-documentation";
import { getVehicleColumns } from "@/app/(private)/components/columns-table-vehicle";
import { ModalDeleteVehicle } from "@/app/(private)/components/modal-delete-vehicle";
import { ModalFormDocumentation } from "@/app/(private)/components/modal-form-documentation";
import { ModalTableVehicle } from "@/app/(private)/components/modal-table-vehicle";
import TabsVehicle from "@/app/(private)/components/tabs-vehicle";
import { useDocumentationFormContext } from "@/app/(private)/context/documentation-context";
import { useModalContext } from "@/app/(private)/context/modal-context";
import { useVehicleFormContext } from "@/app/(private)/context/vehicle-context";
import type { DocumentationData } from "@/app/(private)/utils/types-documentation";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DataTable } from "@/components/ui/data-table";
import { DataTableToolbar } from "@/components/ui/data-table-toolbar";
import { Separator } from "@/components/ui/separator";

export function FormDocumentation() {
	const { setEditingDocumentation } = useDocumentationFormContext();
	const { editingVehicle } = useVehicleFormContext();

	const { setTabPanel } = useModalContext();

	const [isModalFormOpen, setIsModalFormOpen] = useState(false);
	const [isModalEditOpen, setIsModalEditOpen] = useState(false);
	const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

	const onSubmit = () => {
		setTabPanel("gas-supply");
	};

	const openEditModal = useCallback(
		(documentation: DocumentationData) => {
			setEditingDocumentation(documentation);
			setTabPanel("general-data");
			setIsModalFormOpen(true);
		},
		[setEditingDocumentation, setTabPanel],
	);

	const actions: DocumentationColumnActions = useMemo(
		() => ({
			onEdit: openEditModal,
			onDelete: () => {},
		}),
		[openEditModal],
	);

	const columns = useMemo(() => getDocumentationColumns(actions), [actions]);

	const data = editingVehicle?.documentations;

	return (
		<>
			<DataTable columns={columns} data={data ?? []} />
			<Button type="button" onClick={() => setIsModalFormOpen(true)}>
				Adicionar Fotos
			</Button>

			<ModalFormDocumentation
				open={isModalFormOpen}
				setOpen={setIsModalFormOpen}
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
