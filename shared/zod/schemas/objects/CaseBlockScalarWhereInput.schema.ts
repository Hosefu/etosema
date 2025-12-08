import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

const caseblockscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseBlockScalarWhereInputObjectSchema), z.lazy(() => CaseBlockScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseBlockScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseBlockScalarWhereInputObjectSchema), z.lazy(() => CaseBlockScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  settings: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  layout: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  orderRank: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const CaseBlockScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseBlockScalarWhereInput> = caseblockscalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseBlockScalarWhereInput>;
export const CaseBlockScalarWhereInputObjectZodSchema = caseblockscalarwhereinputSchema;
