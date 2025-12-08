import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'

const caseblockmediascalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseBlockMediaScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseBlockMediaScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseBlockMediaScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseBlockMediaScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => CaseBlockMediaScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  blockId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  position: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  alt: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  aspectRatio: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const CaseBlockMediaScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaScalarWhereWithAggregatesInput> = caseblockmediascalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.CaseBlockMediaScalarWhereWithAggregatesInput>;
export const CaseBlockMediaScalarWhereWithAggregatesInputObjectZodSchema = caseblockmediascalarwherewithaggregatesinputSchema;
