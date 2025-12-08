import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './objects/CaseBlockWhereInput.schema';

export const CaseBlockDeleteManySchema: z.ZodType<Prisma.CaseBlockDeleteManyArgs> = z.object({ where: CaseBlockWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockDeleteManyArgs>;

export const CaseBlockDeleteManyZodSchema = z.object({ where: CaseBlockWhereInputObjectSchema.optional() }).strict();