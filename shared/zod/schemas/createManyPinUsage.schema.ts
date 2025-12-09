import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageCreateManyInputObjectSchema as PinUsageCreateManyInputObjectSchema } from './objects/PinUsageCreateManyInput.schema';

export const PinUsageCreateManySchema: z.ZodType<Prisma.PinUsageCreateManyArgs> = z.object({ data: z.union([ PinUsageCreateManyInputObjectSchema, z.array(PinUsageCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.PinUsageCreateManyArgs>;

export const PinUsageCreateManyZodSchema = z.object({ data: z.union([ PinUsageCreateManyInputObjectSchema, z.array(PinUsageCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();