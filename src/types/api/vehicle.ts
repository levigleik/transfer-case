import type { Brand } from "@/types/api/brand";
import type { Category } from "@/types/api/category";
import type { Company } from "@/types/api/company";
import type { Gas } from "@/types/api/gas";

type PlateType = "MERCOSUL" | "OUTRO";

export interface Vehicle {
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
	gas: Gas;
	gasId: number;
	brand: Brand;
	brandId: number;
	category: Category;
	categoryId: number;
	company: Company;
	companyId: number;
	createdAt: Date;
	updatedAt: Date;
}
