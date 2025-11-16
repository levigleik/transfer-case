"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, CloudDownload, RotateCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { ModalForm } from "@/app/(private)/modal-form";
import type { VehicleData } from "@/app/(private)/types";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { getData } from "@/lib/functions.api";
import { cn } from "@/lib/utils";
import type {
	Brand,
	Category,
	Classification,
	Company,
	Status,
	Vehicle,
} from "@/types/api";
import { getVehicleColumns, type VehicleColumnActions } from "./columns";

export default function TableVehicle() {
	// 1. Defina o estado para o modal
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingVehicle, setEditingVehicle] = useState<VehicleData>();

	const handleOpenEditModal = useCallback((vehicle: VehicleData) => {
		setEditingVehicle(vehicle);
		setIsEditModalOpen(true);
	}, []);

	const handleOpenDeleteModal = useCallback((vehicle: VehicleData) => {
		// Lógica para confirmar a exclusão...
		console.log("Deletar:", vehicle.id);
	}, []);

	const actions: VehicleColumnActions = useMemo(
		() => ({
			onEdit: handleOpenEditModal,
			onDelete: handleOpenDeleteModal,
		}),
		[handleOpenEditModal, handleOpenDeleteModal],
	);

	const columns = useMemo(() => getVehicleColumns(actions), [actions]);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["student-get"],
		queryFn: ({ signal }) =>
			getData<VehicleData[]>({
				url: "/vehicle",
				signal,
				query:
					"include.classification=true&include.category=true&&include.brand=true&&include.company&&include.status=true",
			}),
	});
	return (
		<div className="flex flex-1 flex-col gap-6">
			<Card
				className={cn(
					"rounded-[14px] p-0 gap-0 overflow-hidden shadow-custom! border dark:border-[#262626]",
					"max-h-[calc(100dvh-var(--header-height))] md:max-h-[calc(100dvh-var(--header-height)-3rem)]",
					"min-[56rem]:max-h-[calc(100dvh-var(--header-height)-4rem)] dark:shadow-none",
				)}
			>
				<DataTable
					columns={columns}
					loading={isLoading}
					data={data ?? []}
					topRightActions={
						<div className="flex items-center gap-2">
							<Button variant="outline">
								<RotateCw />
								Atualizar
							</Button>
							<ButtonGroup>
								<Button variant="outline">
									<CloudDownload />
									Export
								</Button>
								<Button variant="outline" size="icon">
									<ChevronDown />
								</Button>
							</ButtonGroup>
							<Separator
								orientation="vertical"
								className="data-[orientation=vertical]:w-px data-[orientation=vertical]:h-4 mx-0.5"
							/>
							<ModalForm
								open={isEditModalOpen}
								setOpen={setIsEditModalOpen}
								vehicle={editingVehicle}
							/>
						</div>
					}
				/>
			</Card>
		</div>
	);
}
