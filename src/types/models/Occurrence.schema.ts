import * as z from 'zod';

export const OccurrenceSchema = z.object({
  id: z.number().int(),
  date: z.date(),
  description: z.string(),
  attachment: z.string(),
  seriousnessId: z.number().int(),
  classificationId: z.number().int(),
  vehicleId: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type OccurrenceType = z.infer<typeof OccurrenceSchema>;
