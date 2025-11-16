import type { Vehicle } from "@/types/api/vehicle";

export interface Company {
	id: number;
	name: string;
	cnpj: string;
	vehicles: Vehicle[];
	createdAt: Date;
	updatedAt: Date;
}
