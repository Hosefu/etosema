import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaWhereInputObjectSchema as CaseBlockMediaWhereInputObjectSchema } from './CaseBlockMediaWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CaseBlockMediaWhereInputObjectSchema).optional(),
  some: z.lazy(() => CaseBlockMediaWhereInputObjectSchema).optional(),
  none: z.lazy(() => CaseBlockMediaWhereInputObjectSchema).optional()
}).strict();
export const CaseBlockMediaListRelationFilterObjectSchema: z.ZodType<Prisma.CaseBlockMediaListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaListRelationFilter>;
export const CaseBlockMediaListRelationFilterObjectZodSchema = makeSchema();
