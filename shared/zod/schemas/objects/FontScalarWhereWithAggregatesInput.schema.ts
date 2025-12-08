import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const fontscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => FontScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FontScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FontScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FontScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FontScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  family: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  format: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  weight: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  style: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FontScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.FontScalarWhereWithAggregatesInput> = fontscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.FontScalarWhereWithAggregatesInput>;
export const FontScalarWhereWithAggregatesInputObjectZodSchema = fontscalarwherewithaggregatesinputSchema;
