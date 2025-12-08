import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const casescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  shortTitle: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  year: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  summary: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  isNda: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  orderRank: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  useCustomDesign: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  backgroundColor: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  textColor: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  fontFamily: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  settings: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const CaseScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseScalarWhereWithAggregatesInput> = casescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseScalarWhereWithAggregatesInput>;
export const CaseScalarWhereWithAggregatesInputObjectZodSchema = casescalarwherewithaggregatesinputSchema;
