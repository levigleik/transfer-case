"use client";

import { useQuery } from "@tanstack/react-query";
import {
	ChevronDown,
	CloudDownload,
	FileText,
	Fuel,
	Info,
	RotateCw,
	TriangleAlert,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import { FormDocumentation } from "@/app/(private)/components/form-documentation";
import { FormVehicleData } from "@/app/(private)/components/form-vehicle-data";
import { ModalForm } from "@/app/(private)/components/modal-form";
import { useModalContext } from "@/app/(private)/context/modal-context";
import { useVehicleFormContext } from "@/app/(private)/context/vehicle-context";
import type { VehicleData } from "@/app/(private)/utils/types-vehicle";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import {
	Tabs,
	TabsContent,
	TabsContents,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import { getData } from "@/lib/functions.api";
import { cn } from "@/lib/utils";
import { getVehicleColumns, type VehicleColumnActions } from "./columns";

export default function TableVehicle() {
	const { setEditingVehicle } = useVehicleFormContext();
	const { isModalOpen, setIsModalOpen, tabPanel, setTabPanel } =
		useModalContext();

	const openEditModal = useCallback(
		(vehicle: VehicleData) => {
			setEditingVehicle(vehicle);
			setTabPanel("general-data");
			setIsModalOpen(true);
		},
		[setEditingVehicle, setTabPanel, setIsModalOpen],
	);

	const handleOpenDeleteModal = useCallback((vehicle: VehicleData) => {
		console.log("Deletar:", vehicle.id);
	}, []);

	const actions: VehicleColumnActions = useMemo(
		() => ({
			onEdit: openEditModal,
			onDelete: handleOpenDeleteModal,
		}),
		[openEditModal, handleOpenDeleteModal],
	);

	const columns = useMemo(() => getVehicleColumns(actions), [actions]);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["vehicle-get"],
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
							<ModalForm open={isModalOpen} setOpen={setIsModalOpen}>
								<Tabs
									defaultValue="general-data"
									className="flex flex-col flex-1 overflow-hidden"
									value={tabPanel as any}
									onValueChange={setTabPanel as any}
								>
									<TabsList
										className={cn(
											"inline-flex w-fit items-center justify-center p-[3px] text-foreground",
											"h-auto gap-2 rounded-none bg-transparent px-6 py-1 flex-shrink-0",
										)}
									>
										<TabsTrigger
											value="general-data"
											className={cn(
												"data-[state=active]:after:bg-primary after:absolute after:inset-x-0 after:bottom-0",
												"after:-mb-1.5 after:h-[3px] after:rounded-t",
											)}
										>
											<Info />
											Dados gerais
										</TabsTrigger>
										<TabsTrigger
											value="documentation"
											className={cn(
												"data-[state=active]:after:bg-primary after:absolute after:inset-x-0 after:bottom-0",
												"after:-mb-1.5 after:h-[3px] after:rounded-t",
											)}
										>
											<FileText />
											Documentação
										</TabsTrigger>
										<TabsTrigger
											value="gas-supply"
											className={cn(
												"data-[state=active]:after:bg-primary after:absolute after:inset-x-0 after:bottom-0",
												"after:-mb-1.5 after:h-[3px] after:rounded-t",
											)}
										>
											<Fuel />
											Abastecimento
										</TabsTrigger>
										<TabsTrigger
											value="occurrency"
											className={cn(
												"data-[state=active]:after:bg-primary after:absolute after:inset-x-0 after:bottom-0",
												"after:-mb-1.5 after:h-[3px] after:rounded-t",
											)}
										>
											<TriangleAlert />
											Ocorrência
										</TabsTrigger>
									</TabsList>
									<TabsContents className="flex-1 overflow-y-auto">
										<TabsContent value="general-data" className="space-y-5 p-6">
											<FormVehicleData />
										</TabsContent>
										<TabsContent
											value="documentation"
											className="space-y-6 p-6"
										>
											<FormDocumentation />
										</TabsContent>
									</TabsContents>
								</Tabs>
							</ModalForm>
						</div>
					}
				/>
			</Card>
		</div>
	);
}
