import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useVehicleFormOptions } from "@/app/(private)/use-vehicle-form-options";
import {
	type VehicleData,
	type VehicleForm,
	VehicleFormSchema,
	type VehiclePayload,
	VehiclePayloadSchema,
} from "@/app/(private)/validation";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
	getData,
	postData,
	putData,
	toastErrorsApi,
} from "@/lib/functions.api";
import type {
	BrandType,
	CompanyType,
	PostData,
	PutData,
	StatusType,
	VehicleType,
} from "@/types/models";

interface FormProps {
	setIsModalOpen: (open: boolean) => void;
	vehicle?: VehicleData;
}

export function Form({ vehicle, setIsModalOpen }: FormProps) {
	const { handleSubmit, setValue, control, reset, register } =
		useForm<VehicleForm>({
			resolver: zodResolver(VehicleFormSchema),
			defaultValues: {
				// identifier: vehicle?.identifier.toString() ?? "",
				// model: vehicle?.model ?? "",
				// year: vehicle?.year ?? "",
				// capacity: vehicle?.capacity.toString() ?? "",
				// doors: vehicle?.doors.toString() ?? "",
				// uf: vehicle?.uf ?? "",
				// plateType: vehicle?.plateType ?? "MERCOSUL",
				// plate: vehicle?.plate ?? "",
				// renavam: vehicle?.renavam ?? "",
				// chassi: vehicle?.chassi ?? "",
				// review: vehicle?.review.toString() ?? "",
				// description: vehicle?.description ?? "",
				// photos: vehicle?.photos ?? [],
				// gasId: vehicle?.gasId.toString() ?? "",
				// brandId: vehicle?.brandId.toString() ?? "",
				// classificationId: vehicle?.classificationId.toString() ?? "",
				// categoryId: vehicle?.categoryId.toString() ?? "",
				// companyId: vehicle?.companyId.toString() ?? "",
				// statusId: vehicle?.statusId.toString() ?? "",
				identifier: "ss",
				capacity: "4",
				doors: "4",
				brandId: "1", // Geralmente um ID, "1" funciona
				categoryId: "1",
				classificationId: "1",
				gasId: "1",
				companyId: "1",
				statusId: "1",
				review: "5", // Ex: 5 dias para revisão
				model: "Modelo Teste",
				renavam: "1234567890d0",
				chassi: "9B1234XYZ56189",

				// Campos com tamanho específico
				year: "2023", // length(4)
				uf: "SP", // length(2)
				plate: "ABC1Df3", // min(7)

				// Campos não listados (você pode precisar adicionar)
				plateType: "MERCOSUL",
				description: "Descrição de teste.",
				photos: [],
			},
		});

	const { mutateAsync: mutatePostVehicle, isPending: isLoadingPostVehicle } =
		useMutation({
			mutationFn: async (val: PostData<VehiclePayload>) =>
				postData<VehicleType, VehiclePayload>(val),
			mutationKey: ["vehicle-post"],
		});

	const { mutateAsync: mutatePutVehicle, isPending: isLoadingPutVehicle } =
		useMutation({
			mutationFn: (val: PutData<VehiclePayload>) =>
				putData<VehicleType, VehiclePayload>(val),
			mutationKey: ["vehicle-put"],
		});

	const { statusOptions, companyOptions, brandOptions, isLoadingOptions } =
		useVehicleFormOptions();

	const loading =
		isLoadingPostVehicle || isLoadingPutVehicle || isLoadingOptions;
	// const loading = true;

	const onErrors = () => {
		toast.error("Por favor, corrija os erros no formulário.");
	};

	const onSubmit = (data: VehicleForm) => {
		try {
			const parseData = VehiclePayloadSchema.parse(data);
			if (!vehicle) {
				mutatePostVehicle({
					url: "/vehicle",
					data: parseData,
				})
					.then(() => {
						toast.success("Veículo cadastrado com sucesso");
						setIsModalOpen(false);
						reset();
					})
					.catch((error) => {
						toastErrorsApi(error);
					});
			} else {
				mutatePutVehicle({
					url: "/vehicle",
					data: parseData,
					id: Number(vehicle?.id),
				})
					.then(() => {
						toast.success("Veículo atualizado com sucesso");
					})
					.catch((err) => {
						toastErrorsApi(err);
					});
			}
		} catch (error) {
			console.error("Erro ao parsear dados para API:", error);
			toast.error("Erro interno ao processar formulário.");
		}
	};
	return (
		<form
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit, onErrors)}
			className="flex w-full flex-col gap-4"
		>
			<FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Controller
					name="identifier"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Identificador</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="Transfer Paulo"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="statusId"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-10" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Status</FieldLabel>
								<FormSelect
									value={field.value ?? ""}
									onChange={field.onChange}
									onBlur={field.onBlur}
									aria-invalid={fieldState.invalid}
									options={statusOptions}
									placeholder="Selecione um status..."
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
					name="companyId"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-10" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Companhia</FieldLabel>
								<FormSelect
									value={field.value ?? ""}
									onChange={field.onChange}
									onBlur={field.onBlur}
									aria-invalid={fieldState.invalid}
									options={companyOptions}
									placeholder="Selecione uma companhia..."
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
			<FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Controller
					name="model"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Modelo</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="Buss Vissta 340"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="year"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Ano</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="2012"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="brandId"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-10" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Marca</FieldLabel>
								<FormSelect
									value={field.value ?? ""}
									onChange={field.onChange}
									onBlur={field.onBlur}
									aria-invalid={fieldState.invalid}
									options={brandOptions}
									placeholder="Selecione uma marca..."
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

			<Controller
				name="description"
				control={control}
				render={({ field, fieldState }) =>
					loading ? (
						<Skeleton className="rounded-md w-full h-8" />
					) : (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)
				}
			/>

			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<Button type="submit">Save changes</Button>
			</DialogFooter>
		</form>
	);
}
