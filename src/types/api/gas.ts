import type { GasSupply } from "@/types/api/gas-supply";

import type { Vehicle } from "@/types/api/vehicle";

export interface Gas {
	id: number;
	type: string;
	vehicle: Vehicle[];
	gasSupplies: GasSupply[];
	createdAt: Date;
	updatedAt: Date;
}
