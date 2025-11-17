import type { GasSupplyType } from "@/types/models/gas-supply";

import type { VehicleType } from "@/types/models/vehicle";

export interface GasType {
	id: number;
	type: string;
	vehicle: VehicleType[];
	gasSupplies: GasSupplyType[];
	createdAt: Date;
	updatedAt: Date;
}
