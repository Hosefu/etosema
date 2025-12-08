import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PinCodeNullableScalarRelationFilterObjectSchema as PinCodeNullableScalarRelationFilterObjectSchema } from './PinCodeNullableScalarRelationFilter.schema';
import { PinCodeWhereInputObjectSchema as PinCodeWhereInputObjectSchema } from './PinCodeWhereInput.schema'

const pinusagewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PinUsageWhereInputObjectSchema), z.lazy(() => PinUsageWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PinUsageWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PinUsageWhereInputObjectSchema), z.lazy(() => PinUsageWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  pinCodeId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  ip: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userAgent: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  success: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  path: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  pinCode: z.union([z.lazy(() => PinCodeNullableScalarRelationFilterObjectSchema), z.lazy(() => PinCodeWhereInputObjectSchema)]).optional()
}).strict();
export const PinUsageWhereInputObjectSchema: z.ZodType<Prisma.PinUsageWhereInput> = pinusagewhereinputSchema as unknown as z.ZodType<Prisma.PinUsageWhereInput>;
export const PinUsageWhereInputObjectZodSchema = pinusagewhereinputSchema;
