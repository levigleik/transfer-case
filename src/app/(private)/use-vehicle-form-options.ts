"use client";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/functions.api";
import type { BrandType, CompanyType, StatusType } from "@/types/models";

const mapToSelectOptions = (data: { id: number | string; name: string }[]) =>
	data.map((item) => ({
		value: item.id.toString(),
		label: item.name,
	}));

export function useVehicleFormOptions() {
	const { data: statusOptions, isLoading: loadingStatus } = useQuery({
		queryKey: ["status-get"],
		queryFn: ({ signal }) => getData<StatusType[]>({ url: "status", signal }),
		select: mapToSelectOptions,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const { data: companyOptions, isLoading: loadingCompany } = useQuery({
		queryKey: ["company-get"],
		queryFn: ({ signal }) => getData<CompanyType[]>({ url: "company", signal }),
		select: mapToSelectOptions,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const { data: brandOptions, isLoading: loadingBrand } = useQuery({
		queryKey: ["brand-get"],
		queryFn: ({ signal }) => getData<BrandType[]>({ url: "brand", signal }),
		select: mapToSelectOptions,
		refetchOnMount: false,
		refetchOnReconnect: false,
	});

	const isLoading = loadingStatus || loadingCompany || loadingBrand;

	return {
		statusOptions: statusOptions ?? [],
		companyOptions: companyOptions ?? [],
		brandOptions: brandOptions ?? [],
		isLoadingOptions: isLoading,
	};
}
