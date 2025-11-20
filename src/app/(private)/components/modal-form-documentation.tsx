"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookmarkIcon, FileText } from "lucide-react";
import { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDocumentationFormContext } from "@/app/(private)/context/documentation-context";
import { useModalContext } from "@/app/(private)/context/modal-context";
import { useVehicleFormContext } from "@/app/(private)/context/vehicle-context";
import {
	type DocumentationData,
	type DocumentationForm,
	type DocumentationPayload,
	documentationTypes,
} from "@/app/(private)/utils/types-documentation";
import {
	DocumentationFormSchema,
	DocumentationPayloadSchema,
} from "@/app/(private)/utils/validation-documentation";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { FormBooleanButton } from "@/components/ui/form-boolean-button";
import { FormDatePicker } from "@/components/ui/form-date-picker";
import { FormSelect } from "@/components/ui/form-select";
import { FormToggleGroup } from "@/components/ui/form-toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import { postData, putData, toastErrorsApi } from "@/lib/functions.api";
import type { PostData, PutData } from "@/types/models";

type ModalFormProps = {
	open: boolean;
	setOpen: (open: boolean) => void;
	children?: React.ReactNode;
};

export function ModalFormDocumentation({ open, setOpen }: ModalFormProps) {
	const { editingDocumentation, setEditingDocumentation } =
		useDocumentationFormContext();

	const { editingVehicle, setEditingVehicle } = useVehicleFormContext();

	const { setTabPanel } = useModalContext();

	const queryClient = useQueryClient();

	const buildDefaultValues = useCallback(
		(documentation?: DocumentationData): DocumentationForm => {
			if (!documentation) {
				return {
					days: ["seg", "qua"],
					type: "Tacógrafo",
					anticipateRenewal: false,
					document: "",
					expiryAt: new Date(),
					vehicleId: "1",
				};
			}

			return {
				days: documentation.days ?? [],
				type: documentation.type ?? "",
				anticipateRenewal: documentation.anticipateRenewal,
				document: documentation.document ?? "",
				expiryAt: new Date(documentation.expiryAt) ?? new Date(),
				vehicleId: String(documentation.vehicleId) ?? "",
			};
		},
		[],
	);

	const {
		handleSubmit,
		control,
		reset,
		formState: { isDirty },
	} = useForm<DocumentationForm>({
		resolver: zodResolver(DocumentationFormSchema),
		defaultValues: buildDefaultValues(editingDocumentation),
	});

	const { mutateAsync: mutateUploadPhotos } = useMutation({
		mutationFn: async (params: { id: number; formData: FormData }) =>
			postData<DocumentationData, FormData>({
				url: `/documentation/${params.id}/photos`,
				data: params.formData,
			}),
		mutationKey: ["documentation-upload-photos"],
	});

	const {
		mutateAsync: mutatePostDocumentation,
		isPending: isLoadingPostDocumentation,
	} = useMutation({
		mutationFn: async (val: PostData<DocumentationPayload>) =>
			postData<DocumentationData, DocumentationPayload>(val),
		mutationKey: ["documentation-post"],
	});

	const {
		mutateAsync: mutatePutDocumentation,
		isPending: isLoadingPutDocumentation,
	} = useMutation({
		mutationFn: (val: PutData<DocumentationPayload>) =>
			putData<DocumentationData, DocumentationPayload>(val),
		mutationKey: ["documentation-put"],
	});

	const typeOptions = documentationTypes.map((option) => ({
		label: option,
		value: option,
	}));

	const daysOfWeekOptions = [
		"dom",
		"seg",
		"ter",
		"qua",
		"qui",
		"sex",
		"sáb",
	].map((day) => ({
		label: day.charAt(0).toUpperCase(),
		value: day,
	}));

	const loading = isLoadingPostDocumentation || isLoadingPutDocumentation;
	// const loading = true;

	const onErrors = (err: any) => {
		toast.error("Por favor, corrija os erros no formulário.");
	};

	const onSubmit = async (data: DocumentationForm) => {
		try {
			let savedDocumentation: DocumentationData;

			if (!isDirty && editingDocumentation) {
				setTabPanel("documentation");
				return;
			}
			console.log(data);

			const parseData = DocumentationPayloadSchema.parse({
				...data,
				expiryAt: data.expiryAt?.toISOString(),
				// document: [],
			});

			if (!editingDocumentation) {
				savedDocumentation = await mutatePostDocumentation({
					url: "/documentation",
					data: parseData,
				});
			} else {
				// UPDATE
				savedDocumentation = await mutatePutDocumentation({
					url: "/documentation",
					id: Number(editingDocumentation.id),
					data: parseData,
				});
			}

			setEditingDocumentation(undefined);

			if (editingVehicle)
				await queryClient.invalidateQueries({
					queryKey: ["documentation-get", editingVehicle?.id],
				});
			reset();
			toast.success(
				editingDocumentation
					? "Documento atualizado com sucesso"
					: "Documento cadastrado com sucesso",
			);
			setOpen(false);
		} catch (error: any) {
			toastErrorsApi(error);
		}
	};

	useEffect(() => {
		console.log("editingDocumentation", editingDocumentation);
		reset(buildDefaultValues(editingDocumentation));
	}, [editingDocumentation, reset, buildDefaultValues]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				className="p-0 rounded-xl overflow-hidden gap-0 focus-visible:outline-none sm:max-w-4xl
        flex flex-col max-h-[90vh]"
			>
				<div className="flex items-center gap-3 p-6 flex-shrink-0">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-full border">
						<FileText />
					</div>
					<DialogHeader>
						<DialogTitle>Adicionar documento</DialogTitle>
						<DialogDescription>
							Preencha os campos abaixo para cadastrar um novo documento.
						</DialogDescription>
					</DialogHeader>
				</div>

				<form
					autoComplete="off"
					onSubmit={handleSubmit(onSubmit, onErrors)}
					className="flex w-full flex-col gap-4 p-6"
				>
					<FieldGroup className="grid grid-cols-1 lg:grid-cols-8 gap-4">
						<Controller
							name="days"
							control={control}
							render={({ field, fieldState }) =>
								loading ? (
									<Skeleton className="rounded-md w-full h-8" />
								) : (
									<Field
										data-invalid={fieldState.invalid}
										className="col-span-3"
									>
										<FieldLabel htmlFor={field.name}>Dias</FieldLabel>
										<FormToggleGroup
											id={field.name}
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
											aria-invalid={fieldState.invalid}
											options={daysOfWeekOptions}
											className="w-full"
											type="multiple"
										/>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)
							}
						/>
						<Controller
							name="type"
							control={control}
							render={({ field, fieldState }) =>
								loading ? (
									<Skeleton className="rounded-md w-full h-10" />
								) : (
									<Field
										data-invalid={fieldState.invalid}
										className="col-span-3 lg:col-span-2"
									>
										<FieldLabel htmlFor={field.name}>Tipo</FieldLabel>
										<FormSelect
											id={field.name}
											value={field.value ?? ""}
											onChange={field.onChange}
											onBlur={field.onBlur}
											aria-invalid={fieldState.invalid}
											options={typeOptions}
											placeholder="Selecione um tipo..."
											className="w-full"
											name={field.name}
										/>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)
							}
						/>
						<Controller
							name="expiryAt"
							control={control}
							render={({ field, fieldState }) =>
								loading ? (
									<Skeleton className="rounded-md w-full h-10" />
								) : (
									<Field
										data-invalid={fieldState.invalid}
										className="col-span-2"
									>
										<FieldLabel htmlFor={field.name}>Tipo</FieldLabel>
										<FormDatePicker
											id={field.name}
											value={field.value ?? ""}
											onChange={field.onChange}
											onBlur={field.onBlur}
											aria-invalid={fieldState.invalid}
											placeholder="15/05/2026"
											className="w-full"
											name={field.name}
										/>

										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)
							}
						/>
						<Controller
							name="anticipateRenewal"
							control={control}
							render={({ field, fieldState }) =>
								loading ? (
									<Skeleton className="rounded-md w-full h-10" />
								) : (
									<Field
										// orientation="horizontal"
										data-invalid={fieldState.invalid}
									>
										<FieldLabel htmlFor={field.name}>Antecipação</FieldLabel>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
										<FormBooleanButton
											id={field.name}
											value={field.value}
											onChange={field.onChange}
											onBlur={field.onBlur}
											aria-invalid={fieldState.invalid}
											className="w-full"
										>
											<BookmarkIcon />
											Bookmark
										</FormBooleanButton>
										{/*<Switch*/}
										{/*	id={field.name}*/}
										{/*	name={field.name}*/}
										{/*	checked={field.value}*/}
										{/*	onCheckedChange={field.onChange}*/}
										{/*	aria-invalid={fieldState.invalid}*/}
										{/*/>*/}
									</Field>
								)
							}
						/>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						{loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Button type="submit">Save changes</Button>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
