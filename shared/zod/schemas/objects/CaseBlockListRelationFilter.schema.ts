import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './CaseBlockWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseBlockWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseBlockWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseBlockWhereInputObjectSchema).optional()
}).strict();
export const CaseBlockListRelationFilterObjectSchema: z.ZodType<Prisma.CaseBlockListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockListRelationFilter>;
export const CaseBlockListRelationFilterObjectZodSchema = makeSchema();
