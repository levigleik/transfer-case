import type {
	Brand,
	Category,
	Classification,
	Company,
	Status,
	Vehicle,
} from "@/types/api";

export type VehicleData = Vehicle & {
	classification: Classification;
	category: Category;
	brand: Brand;
	company: Company;
	status: Status;
};
