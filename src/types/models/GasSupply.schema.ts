import * as z from "zod";

export const GasSupplySchema = z.object({
	id: z.number().int(),
	kmToReview: z.number().int(),
	kmToStop: z.number().int(),
	quantity: z.number(),
	supplyAt: z.date(),
	totalPrice: z.number(),
	receipt: z.string(),
	gasId: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type GasSupplyType = z.infer<typeof GasSupplySchema>;
