import * as z from 'zod';

export const OccurrenceScalarFieldEnumSchema = z.enum(['id', 'date', 'description', 'seriousnessId', 'classificationId', 'createdAt', 'updatedAt'])

export type OccurrenceScalarFieldEnum = z.infer<typeof OccurrenceScalarFieldEnumSchema>;