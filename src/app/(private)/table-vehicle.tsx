"use client";

import { useQuery } from "@tanstack/react-query";
import { ChevronDown, CloudDownload, Info, RotateCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Form } from "@/app/(private)/form";
import { ModalForm } from "@/app/(private)/modal-form";
import type { VehicleData } from "@/app/(private)/validation";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
							<ModalForm open={isEditModalOpen} setOpen={setIsEditModalOpen}>
								<Tabs
									defaultValue="account"
									className="flex flex-col flex-1 overflow-hidden"
								>
									<TabsList className="inline-flex w-fit items-center justify-center p-[3px] text-foreground h-auto gap-2 rounded-none bg-transparent px-6 py-1 flex-shrink-0">
										<TabsTrigger
											value="account"
											className="data-[state=active]:after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:-mb-1.5 after:h-[3px] after:rounded-t"
										>
											<Info />
											Informações
										</TabsTrigger>
										<TabsTrigger
											value="password"
											className="data-[state=active]:after:bg-primary after:absolute after:inset-x-0 after:bottom-0 after:-mb-1.5 after:h-[3px] after:rounded-t"
										>
											Password
										</TabsTrigger>
									</TabsList>

									<TabsContents className="flex-1 overflow-y-auto">
										<TabsContent value="account" className="space-y-5 p-6">
											<Form
												vehicle={editingVehicle}
												setIsModalOpen={setIsEditModalOpen}
											/>
										</TabsContent>
										<TabsContent value="password" className="space-y-6 p-6">
											<p className="text-sm text-muted-foreground">
												Change your password here. After saving, you&apos;ll be
												logged out.
											</p>
											<div className="space-y-3">
												<div className="space-y-1">
													<Label htmlFor="current">Current password</Label>
													<Input id="current" type="password" />
												</div>
												<div className="space-y-1">
													<Label htmlFor="new">New password</Label>
													<Input id="new" type="password" />
												</div>
												<div className="space-y-1">
													<Label htmlFor="confirm">Confirm password</Label>
													<Input id="confirm" type="password" />
												</div>
											</div>
											<Button>Save password</Button>
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
