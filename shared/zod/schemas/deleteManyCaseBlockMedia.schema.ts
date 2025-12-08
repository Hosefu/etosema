import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockMediaWhereInputObjectSchema as CaseBlockMediaWhereInputObjectSchema } from './objects/CaseBlockMediaWhereInput.schema';

export const CaseBlockMediaDeleteManySchema: z.ZodType<Prisma.CaseBlockMediaDeleteManyArgs> = z.object({ where: CaseBlockMediaWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockMediaDeleteManyArgs>;

export const CaseBlockMediaDeleteManyZodSchema = z.object({ where: CaseBlockMediaWhereInputObjectSchema.optional() }).strict();