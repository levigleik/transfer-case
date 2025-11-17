import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useVehicleFormOptions } from "@/app/(private)/hooks/use-vehicle-form-options";
import {
	type VehicleData,
	type VehicleForm,
	VehicleFormSchema,
	type VehiclePayload,
	VehiclePayloadSchema,
} from "@/app/(private)/utils/validation";
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
import { InputNumber } from "@/components/ui/input-number";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
	getData,
	postData,
	putData,
	toastErrorsApi,
} from "@/lib/functions.api";
import {
	type PlateType,
	PlateTypeSchema,
} from "@/types/enums/PlateType.schema";
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
	const queryClient = useQueryClient();
	const { handleSubmit, setValue, control, reset, register } =
		useForm<VehicleForm>({
			resolver: zodResolver(VehicleFormSchema),
			defaultValues: vehicle
				? {
						identifier: vehicle.identifier,
						model: vehicle.model,
						year: vehicle.year,
						capacity: String(vehicle.capacity),
						doors: String(vehicle.doors),
						uf: vehicle.uf,
						plateType: vehicle.plateType,
						plate: vehicle.plate,
						renavam: vehicle.renavam,
						chassi: vehicle.chassi,
						review: String(vehicle.review),
						description: vehicle.description,
						photos: vehicle.photos,
						gasId: String(vehicle.gasId),
						brandId: String(vehicle.brandId),
						classificationId: String(vehicle.classificationId),
						categoryId: String(vehicle.categoryId),
						companyId: String(vehicle.companyId),
						statusId: String(vehicle.statusId),
					}
				: {
						identifier: "",
						model: "",
						year: "",
						capacity: "0",
						doors: "0",
						uf: "",
						plateType: "MERCOSUL" as PlateType,
						plate: "",
						renavam: "",
						chassi: "",
						review: "0",
						description: "",
						photos: [],
						gasId: "",
						brandId: "",
						classificationId: "",
						categoryId: "",
						companyId: "",
						statusId: "",
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

	const {
		statusOptions,
		companyOptions,
		brandOptions,
		classificationOptions,
		categoryOptions,
		gasOptions,
		isLoadingOptions,
	} = useVehicleFormOptions();

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
						queryClient.invalidateQueries({ queryKey: ["vehicle-get"] });
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
			<FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Controller
					name="identifier"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field
								data-invalid={fieldState.invalid}
								className="md:col-span-2"
							>
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
			</FieldGroup>
			<FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Controller
					name="model"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field
								data-invalid={fieldState.invalid}
								className="md:col-span-2"
							>
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
			<FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Controller
					name="capacity"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Capacidade</FieldLabel>
								<InputNumber
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="45"
									value={Number(field.value)}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="doors"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Portas</FieldLabel>
								<InputNumber
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="4"
									value={Number(field.value)}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="categoryId"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-10" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Categoria</FieldLabel>
								<FormSelect
									value={field.value ?? ""}
									onChange={field.onChange}
									onBlur={field.onBlur}
									aria-invalid={fieldState.invalid}
									options={categoryOptions}
									placeholder="Selecione uma categoria..."
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
					name="classificationId"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-10" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Classificação</FieldLabel>
								<FormSelect
									value={field.value ?? ""}
									onChange={field.onChange}
									onBlur={field.onBlur}
									aria-invalid={fieldState.invalid}
									options={classificationOptions}
									placeholder="Selecione uma classificação..."
									className="w-full "
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
			<FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Controller
					name="plate"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Placa</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="OCH1A34"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="renavam"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Renavam</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="13248512471"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="chassi"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-10" />
						) : (
							<Field
								data-invalid={fieldState.invalid}
								className="md:col-span-2"
							>
								<FieldLabel htmlFor={field.name}>Chassi</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="9BD111060T5002156"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
			</FieldGroup>
			<FieldGroup className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Controller
					name="uf"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>UF</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="SP"
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="review"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-8" />
						) : (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Revisão</FieldLabel>
								<InputNumber
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder="2400"
									decimalScale={3}
									value={Number(field.value)}
								/>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)
					}
				/>
				<Controller
					name="gasId"
					control={control}
					render={({ field, fieldState }) =>
						loading ? (
							<Skeleton className="rounded-md w-full h-10" />
						) : (
							<Field
								data-invalid={fieldState.invalid}
								className="md:col-span-2"
							>
								<FieldLabel htmlFor={field.name}>Combustível</FieldLabel>
								<FormSelect
									value={field.value ?? ""}
									onChange={field.onChange}
									onBlur={field.onBlur}
									aria-invalid={fieldState.invalid}
									options={gasOptions}
									placeholder="Selecione um combustível..."
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
