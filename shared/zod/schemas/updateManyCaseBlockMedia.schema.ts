import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaUpdateManyMutationInputObjectSchema as CaseBlockMediaUpdateManyMutationInputObjectSchema } from './objects/CaseBlockMediaUpdateManyMutationInput.schema';
import { CaseBlockMediaWhereInputObjectSchema as CaseBlockMediaWhereInputObjectSchema } from './objects/CaseBlockMediaWhereInput.schema';

export const CaseBlockMediaUpdateManySchema: z.ZodType<Prisma.CaseBlockMediaUpdateManyArgs> = z.object({ data: CaseBlockMediaUpdateManyMutationInputObjectSchema, where: CaseBlockMediaWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaUpdateManyArgs>;

export const CaseBlockMediaUpdateManyZodSchema = z.object({ data: CaseBlockMediaUpdateManyMutationInputObjectSchema, where: CaseBlockMediaWhereInputObjectSchema.optional() }).strict();