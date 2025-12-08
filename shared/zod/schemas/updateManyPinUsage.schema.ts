import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PinUsageUpdateManyMutationInputObjectSchema as PinUsageUpdateManyMutationInputObjectSchema } from './objects/PinUsageUpdateManyMutationInput.schema';
import { PinUsageWhereInputObjectSchema as PinUsageWhereInputObjectSchema } from './objects/PinUsageWhereInput.schema';

export const PinUsageUpdateManySchema: z.ZodType<Prisma.PinUsageUpdateManyArgs> = z.object({ data: PinUsageUpdateManyMutationInputObjectSchema, where: PinUsageWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PinUsageUpdateManyArgs>;

export const PinUsageUpdateManyZodSchema = z.object({ data: PinUsageUpdateManyMutationInputObjectSchema, where: PinUsageWhereInputObjectSchema.optional() }).strict();