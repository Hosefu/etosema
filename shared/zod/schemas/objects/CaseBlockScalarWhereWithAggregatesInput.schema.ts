import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'

const caseblockscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseBlockScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseBlockScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseBlockScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseBlockScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseBlockScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  settings: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  layout: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  orderRank: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const CaseBlockScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseBlockScalarWhereWithAggregatesInput> = caseblockscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseBlockScalarWhereWithAggregatesInput>;
export const CaseBlockScalarWhereWithAggregatesInputObjectZodSchema = caseblockscalarwherewithaggregatesinputSchema;
