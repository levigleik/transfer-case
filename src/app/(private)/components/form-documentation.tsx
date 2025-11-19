import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BusFront, LucidePlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ModalFormDocumentation } from "@/app/(private)/components/modal-form-documentation";
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
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { FormMultiSelect } from "@/components/ui/form-multi-select";
import { FormSelect } from "@/components/ui/form-select";
import { Skeleton } from "@/components/ui/skeleton";
import { postData, putData, toastErrorsApi } from "@/lib/functions.api";
import type { PostData, PutData } from "@/types/models";

export function FormDocumentation() {
	const { editingDocumentations, setEditingDocumentations } =
		useDocumentationFormContext();

	const { editingVehicle } = useVehicleFormContext();

	const { setTabPanel } = useModalContext();

	const [openModal, setOpenModal] = useState(false);

	const buildDefaultValues = (
		documentation?: DocumentationData,
	): DocumentationForm => {
		if (!documentation) {
			return {
				days: ["seg", "qua"],
				type: "Tacógrafo",
				anticipateRenewal: false,
				document: "",
				expiryAt: new Date().toISOString(),
				vehicleId: "1",
			};
		}

		return {
			days: documentation.days ?? "",
			type: documentation.type ?? "",
			anticipateRenewal: documentation.anticipateRenewal,
			document: documentation.document ?? "",
			expiryAt: documentation.expiryAt ?? new Date().toISOString(),
			vehicleId: String(documentation.vehicleId) ?? "1",
		};
	};

	const {
		handleSubmit,
		control,
		reset,
		formState: { isDirty },
	} = useForm<DocumentationForm>({
		resolver: zodResolver(DocumentationFormSchema),
		// defaultValues: buildDefaultValues(editingDocumentations),
		defaultValues: {
			expiryAt: new Date().toISOString(),
			document: "",
			vehicleId: "2",
			days: [],
			type: "",
			anticipateRenewal: true,
		},
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
		label: day,
		value: day,
	}));

	const loading = isLoadingPostDocumentation || isLoadingPutDocumentation;
	// const loading = true;

	const onErrors = (err: any) => {
		console.log(err);
		toast.error("Por favor, corrija os erros no formulário.");
	};

	const onSubmit = async (data: DocumentationForm) => {
		try {
			let savedDocumentation: DocumentationData;

			if (!isDirty && editingDocumentations) {
				setTabPanel("documentation");
				return;
			}
			console.log(data);

			const parseData = DocumentationPayloadSchema.parse({
				...data,
				// document: [],
			});

			if (!editingDocumentations) {
				savedDocumentation = await mutatePostDocumentation({
					url: "/documentation",
					data: parseData,
				});
			} else {
				// UPDATE
				savedDocumentation = await mutatePutDocumentation({
					url: "/documentation",
					id: Number(editingDocumentations[0].id),
					data: parseData,
				});
			}

			setEditingDocumentations(savedDocumentation as any);

			const normalized = buildDefaultValues(savedDocumentation as any);

			reset(normalized);
			toast.success(
				editingDocumentations
					? "Veículo atualizado com sucesso"
					: "Veículo cadastrado com sucesso",
			);
			setTabPanel("documentation");
		} catch (error: any) {
			toastErrorsApi(error);
		}
	};
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit, onErrors)}
			className="flex w-full flex-col gap-4"
		>
			<Button type="button" onClick={() => setOpenModal(true)}>
				Adicionar Fotos
			</Button>

			<ModalFormDocumentation open={openModal} setOpen={setOpenModal}>
				<div className="flex flex-col gap-4 p-6">
					<FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4">
						<Controller
							name="days"
							control={control}
							render={({ field, fieldState }) =>
								loading ? (
									<Skeleton className="rounded-md w-full h-8" />
								) : (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Dias</FieldLabel>
										<FormMultiSelect
											values={field.value}
											onValuesChange={field.onChange}
											onBlur={field.onBlur}
											aria-invalid={fieldState.invalid}
											options={daysOfWeekOptions}
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
							name="type"
							control={control}
							render={({ field, fieldState }) =>
								loading ? (
									<Skeleton className="rounded-md w-full h-10" />
								) : (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor={field.name}>Tipo</FieldLabel>
										<FormSelect
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
					</FieldGroup>
				</div>
			</ModalFormDocumentation>

			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				{loading ? (
					<Skeleton className="rounded-md w-full h-8" />
				) : (
					<Button type="submit" disabled={!editingVehicle?.id}>
						Save changes
					</Button>
				)}
			</DialogFooter>
		</form>
	);
}
