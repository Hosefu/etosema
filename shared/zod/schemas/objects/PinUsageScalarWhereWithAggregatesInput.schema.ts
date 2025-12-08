import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const pinusagescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PinUsageScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PinUsageScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PinUsageScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PinUsageScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PinUsageScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  pinCodeId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  ip: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userAgent: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  success: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  path: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PinUsageScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PinUsageScalarWhereWithAggregatesInput> = pinusagescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PinUsageScalarWhereWithAggregatesInput>;
export const PinUsageScalarWhereWithAggregatesInputObjectZodSchema = pinusagescalarwherewithaggregatesinputSchema;
