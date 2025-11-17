import * as z from 'zod';

export const OccurenceSchema = z.object({
  id: z.number().int(),
  date: z.date(),
  description: z.string(),
  seriousnessId: z.number().int(),
  classificationId: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type OccurenceType = z.infer<typeof OccurenceSchema>;
