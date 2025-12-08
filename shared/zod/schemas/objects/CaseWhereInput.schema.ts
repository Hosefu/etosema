import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { CaseBlockListRelationFilterObjectSchema as CaseBlockListRelationFilterObjectSchema } from './CaseBlockListRelationFilter.schema';
import { PinCodeCaseListRelationFilterObjectSchema as PinCodeCaseListRelationFilterObjectSchema } from './PinCodeCaseListRelationFilter.schema'

const casewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseWhereInputObjectSchema), z.lazy(() => CaseWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseWhereInputObjectSchema), z.lazy(() => CaseWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slug: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  shortTitle: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  year: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  summary: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  isNda: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  orderRank: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  useCustomDesign: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  backgroundColor: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  textColor: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  fontFamily: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  settings: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  blocks: z.lazy(() => CaseBlockListRelationFilterObjectSchema).optional(),
  pinAccess: z.lazy(() => PinCodeCaseListRelationFilterObjectSchema).optional()
}).strict();
export const CaseWhereInputObjectSchema: z.ZodType<Prisma.CaseWhereInput> = casewhereinputSchema as unknown as z.ZodType<Prisma.CaseWhereInput>;
export const CaseWhereInputObjectZodSchema = casewhereinputSchema;
