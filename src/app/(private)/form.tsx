import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	type VehicleData,
	type VehicleForm,
	VehicleFormSchema,
	type VehiclePayload,
	VehiclePayloadSchema,
} from "@/app/(private)/validation";

import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { postData, putData, toastErrorsApi } from "@/lib/functions.api";
import type { PostData, PutData, VehicleType } from "@/types/models";

interface FormProps {
	vehicle?: VehicleData;
}

export function Form({ vehicle }: FormProps) {
	const { handleSubmit, setValue, control, reset, register } =
		useForm<VehicleForm>({
			resolver: zodResolver(VehicleFormSchema),
			defaultValues: {
				identifier: vehicle?.identifier.toString() ?? "",
				model: vehicle?.model ?? "",
				year: vehicle?.year ?? "",
				capacity: vehicle?.capacity.toString() ?? "",
				doors: vehicle?.doors.toString() ?? "",
				uf: vehicle?.uf ?? "",
				plateType: vehicle?.plateType ?? "MERCOSUL",
				plate: vehicle?.plate ?? "",
				renavam: vehicle?.renavam ?? "",
				chassi: vehicle?.chassi ?? "",
				review: vehicle?.review.toString() ?? "",
				description: vehicle?.description ?? "",
				photos: vehicle?.photos ?? [],
				gasId: vehicle?.gasId.toString() ?? "",
				brandId: vehicle?.brandId.toString() ?? "",
				classificationId: vehicle?.classificationId.toString() ?? "",
				categoryId: vehicle?.categoryId.toString() ?? "",
				companyId: vehicle?.companyId.toString() ?? "",
				statusId: vehicle?.statusId.toString() ?? "",
			},
		});

	const { mutateAsync: mutatePostVehicle, isPending: loadingPostVehicle } =
		useMutation({
			mutationFn: async (val: PostData<VehiclePayload>) =>
				postData<VehicleType, VehiclePayload>(val),
			mutationKey: ["vehicle-post"],
		});

	const { mutateAsync: mutatePutVehicle, isPending: loadingPutVehicle } =
		useMutation({
			mutationFn: (val: PutData<VehiclePayload>) =>
				putData<VehicleType, VehiclePayload>(val),
			mutationKey: ["vehicle-put"],
		});

	const loading = loadingPostVehicle || loadingPutVehicle;

	const onSubmit = (data: VehicleForm) => {
		try {
			const parseData = VehiclePayloadSchema.parse(data);
			if (!vehicle) {
				console.log("Submitting new vehicle:", parseData);
				mutatePostVehicle({
					url: "/vehicle",
					data: parseData,
				})
					.then(() => {
						toast.success("Veículo cadastrado com sucesso");
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
			onSubmit={handleSubmit(onSubmit)}
			className="flex w-full flex-col gap-4"
		>
			<FieldGroup>
				<Controller
					name="identifier"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-title">
								Identificador
							</FieldLabel>
							<Input
								{...field}
								id="form-rhf-demo-title"
								aria-invalid={fieldState.invalid}
								placeholder="Transfer Paulo"
								autoComplete="off"
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor="form-rhf-demo-description">
								Description
							</FieldLabel>
							<Textarea
								{...field}
								id="form-rhf-demo-description"
								placeholder="316"
								rows={6}
								className="min-h-24"
								aria-invalid={fieldState.invalid}
								value={field.value ?? ""} // parse para caso seja null
							/>
							<FieldDescription>
								Include steps to reproduce, expected behavior, and what actually
								happened.
							</FieldDescription>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			</FieldGroup>
			<Controller
				name="identifier"
				control={control}
				defaultValue=""
				rules={{ required: "Campo obrigatório" }}
				render={({ field, fieldState: { error } }) =>
					loading ? (
						<Skeleton className="rounded-md" />
					) : (
						<Input
							id={field.name}
							type="text"
							onChange={field.onChange}
							name={field.name}
							value={field.value}
							color="primary"
						/>
					)
				}
			/>
			{/*<Controller*/}
			{/*	name="courseId"*/}
			{/*	control={control}*/}
			{/*	rules={{ required: "Campo obrigatório" }}*/}
			{/*	render={({ field, fieldState: { error } }) => (*/}
			{/*		<Skeleton className="rounded-md" isLoaded={!loadingGetCourse}>*/}
			{/*			<Select*/}
			{/*				items={dataGetCourse ?? []}*/}
			{/*				label="Curso"*/}
			{/*				id={field.name}*/}
			{/*				onChange={field.onChange}*/}
			{/*				name={field.name}*/}
			{/*				selectedKeys={field.value ? [field.value] : new Set([])}*/}
			{/*				variant="bordered"*/}
			{/*				color="primary"*/}
			{/*				isInvalid={!!error}*/}
			{/*				isRequired*/}
			{/*				errorMessage={error?.message}*/}
			{/*				classNames={{*/}
			{/*					value: "text-foreground",*/}
			{/*				}}*/}
			{/*			>*/}
			{/*				{(course) => (*/}
			{/*					<SelectItem key={course.id} value={course.id}>*/}
			{/*						{course.name}*/}
			{/*					</SelectItem>*/}
			{/*				)}*/}
			{/*			</Select>*/}
			{/*		</Skeleton>*/}
			{/*	)}*/}
			{/*/>*/}
			<DialogFooter>
				<DialogClose asChild>
					<Button variant="outline">Cancel</Button>
				</DialogClose>
				<Button type="submit">Save changes</Button>
			</DialogFooter>
		</form>
	);
}
