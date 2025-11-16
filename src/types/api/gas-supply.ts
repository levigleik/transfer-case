import type { Gas } from "@/types/api/gas";

export interface GasSupply {
	id: number;
	kmToReview: number;
	kmToStop: number;
	quantity: number;
	supplyAt: Date;
	totalPrice: number;
	gas: Gas;
	gasId: number;
	createdAt: Date;
	updatedAt: Date;
}
