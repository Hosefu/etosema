import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { CaseBlockCreateManyInputObjectSchema as CaseBlockCreateManyInputObjectSchema } from './objects/CaseBlockCreateManyInput.schema';

export const CaseBlockCreateManySchema: z.ZodType<Prisma.CaseBlockCreateManyArgs> = z.object({ data: z.union([ CaseBlockCreateManyInputObjectSchema, z.array(CaseBlockCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.CaseBlockCreateManyArgs>;

export const CaseBlockCreateManyZodSchema = z.object({ data: z.union([ CaseBlockCreateManyInputObjectSchema, z.array(CaseBlockCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();