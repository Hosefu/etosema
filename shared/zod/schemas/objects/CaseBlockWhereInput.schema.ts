import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { CaseScalarRelationFilterObjectSchema as CaseScalarRelationFilterObjectSchema } from './CaseScalarRelationFilter.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema';
import { CaseBlockMediaListRelationFilterObjectSchema as CaseBlockMediaListRelationFilterObjectSchema } from './CaseBlockMediaListRelationFilter.schema'

const caseblockwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseBlockWhereInputObjectSchema), z.lazy(() => CaseBlockWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseBlockWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseBlockWhereInputObjectSchema), z.lazy(() => CaseBlockWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  caseId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  content: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  settings: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  layout: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  orderRank: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  case: z.union([z.lazy(() => CaseScalarRelationFilterObjectSchema), z.lazy(() => CaseWhereInputObjectSchema)]).optional(),
  medias: z.lazy(() => CaseBlockMediaListRelationFilterObjectSchema).optional()
}).strict();
export const CaseBlockWhereInputObjectSchema: z.ZodType<Prisma.CaseBlockWhereInput> = caseblockwhereinputSchema as unknown as z.ZodType<Prisma.CaseBlockWhereInput>;
export const CaseBlockWhereInputObjectZodSchema = caseblockwhereinputSchema;
