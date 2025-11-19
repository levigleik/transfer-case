"use client";
import { useState } from "react";
import { ModalFormDocumentation } from "@/app/(private)/components/modal-form-documentation";
import { useModalContext } from "@/app/(private)/context/modal-context";
import { useVehicleFormContext } from "@/app/(private)/context/vehicle-context";
import { Button } from "@/components/ui/button";

export function FormDocumentation() {
	const { editingVehicle } = useVehicleFormContext();

	const { setTabPanel } = useModalContext();

	const [openModal, setOpenModal] = useState(false);

	const onSubmit = () => {
		setTabPanel("gas-supply");
	};
	return (
		<>
			<Button type="button" onClick={() => setOpenModal(true)}>
				Adicionar Fotos
			</Button>

			<ModalFormDocumentation open={openModal} setOpen={setOpenModal} />

			<div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
				<Button variant="outline">Cancel</Button>
				<Button type="button" onClick={onSubmit} disabled={!editingVehicle?.id}>
					Save changes
				</Button>
			</div>
		</>
	);
}
