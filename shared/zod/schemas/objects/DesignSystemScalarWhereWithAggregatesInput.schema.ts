import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const designsystemscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => DesignSystemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => DesignSystemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DesignSystemScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DesignSystemScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => DesignSystemScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  typography: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  colors: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  links: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  cards: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  grid: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  spacing: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  faviconUrl: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DesignSystemScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.DesignSystemScalarWhereWithAggregatesInput> = designsystemscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.DesignSystemScalarWhereWithAggregatesInput>;
export const DesignSystemScalarWhereWithAggregatesInputObjectZodSchema = designsystemscalarwherewithaggregatesinputSchema;
