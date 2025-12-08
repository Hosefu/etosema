import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema';
import { DateTimeNullableWithAggregatesFilterObjectSchema as DateTimeNullableWithAggregatesFilterObjectSchema } from './DateTimeNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const pincodescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PinCodeScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PinCodeScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PinCodeScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PinCodeScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PinCodeScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  label: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  codeHash: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  shortCode: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  accessAll: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PinCodeScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PinCodeScalarWhereWithAggregatesInput> = pincodescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PinCodeScalarWhereWithAggregatesInput>;
export const PinCodeScalarWhereWithAggregatesInputObjectZodSchema = pincodescalarwherewithaggregatesinputSchema;
