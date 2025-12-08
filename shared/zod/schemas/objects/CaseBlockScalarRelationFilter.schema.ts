import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './CaseBlockWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => CaseBlockWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => CaseBlockWhereInputObjectSchema).optional()
}).strict();
export const CaseBlockScalarRelationFilterObjectSchema: z.ZodType<Prisma.CaseBlockScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockScalarRelationFilter>;
export const CaseBlockScalarRelationFilterObjectZodSchema = makeSchema();
