import type { GasType } from "@/types/models/gas";

export interface GasSupplyType {
	id: number;
	kmToReview: number;
	kmToStop: number;
	quantity: number;
	supplyAt: Date;
	totalPrice: number;
	gas: GasType;
	gasId: number;
	createdAt: Date;
	updatedAt: Date;
}
