import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockUpdateManyMutationInputObjectSchema as CaseBlockUpdateManyMutationInputObjectSchema } from './objects/CaseBlockUpdateManyMutationInput.schema';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './objects/CaseBlockWhereInput.schema';

export const CaseBlockUpdateManySchema: z.ZodType<Prisma.CaseBlockUpdateManyArgs> = z.object({ data: CaseBlockUpdateManyMutationInputObjectSchema, where: CaseBlockWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockUpdateManyArgs>;

export const CaseBlockUpdateManyZodSchema = z.object({ data: CaseBlockUpdateManyMutationInputObjectSchema, where: CaseBlockWhereInputObjectSchema.optional() }).strict();