import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageWhereInputObjectSchema as PinUsageWhereInputObjectSchema } from './objects/PinUsageWhereInput.schema';

export const PinUsageDeleteManySchema: z.ZodType<Prisma.PinUsageDeleteManyArgs> = z.object({ where: PinUsageWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinUsageDeleteManyArgs>;

export const PinUsageDeleteManyZodSchema = z.object({ where: PinUsageWhereInputObjectSchema.optional() }).strict();