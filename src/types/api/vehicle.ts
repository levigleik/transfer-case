import type { BrandType } from "@/types/models/brand";
import type { CategoryType } from "@/types/models/category";
import type { ClassificationType } from "@/types/models/classification";
import type { CompanyType } from "@/types/models/company";
import type { GasType } from "@/types/models/gas";
import type { StatusType } from "@/types/models/status";

type PlateType = "MERCOSUL" | "OUTRO";

export interface VehicleType {
	id: number;
	identifier: number;
	mode: string;
	year: string;
	capacity: number;
	doors: number;
	uf: string;
	plateType: PlateType;
	plate: string;
	renavam: string;
	chassi: string;
	review: number;
	description?: string | null;
	photos: string[];
	gas: GasType;
	gasId: number;
	brand: BrandType;
	brandId: number;
	category: CategoryType;
	categoryId: number;
	classification: ClassificationType;
	classificationId: number;
	company: CompanyType;
	companyId: number;
	status: StatusType;
	statusId: number;
	createdAt: Date;
	updatedAt: Date;
}
