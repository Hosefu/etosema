import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PinCodeCaseListRelationFilterObjectSchema as PinCodeCaseListRelationFilterObjectSchema } from './PinCodeCaseListRelationFilter.schema';
import { PinUsageListRelationFilterObjectSchema as PinUsageListRelationFilterObjectSchema } from './PinUsageListRelationFilter.schema'

const pincodewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PinCodeWhereInputObjectSchema), z.lazy(() => PinCodeWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PinCodeWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PinCodeWhereInputObjectSchema), z.lazy(() => PinCodeWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  label: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  codeHash: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  shortCode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  accessAll: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  cases: z.lazy(() => PinCodeCaseListRelationFilterObjectSchema).optional(),
  usages: z.lazy(() => PinUsageListRelationFilterObjectSchema).optional()
}).strict();
export const PinCodeWhereInputObjectSchema: z.ZodType<Prisma.PinCodeWhereInput> = pincodewhereinputSchema as unknown as z.ZodType<Prisma.PinCodeWhereInput>;
export const PinCodeWhereInputObjectZodSchema = pincodewhereinputSchema;
