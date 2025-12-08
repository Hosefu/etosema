import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { CaseBlockScalarRelationFilterObjectSchema as CaseBlockScalarRelationFilterObjectSchema } from './CaseBlockScalarRelationFilter.schema';
import { CaseBlockWhereInputObjectSchema as CaseBlockWhereInputObjectSchema } from './CaseBlockWhereInput.schema'

const caseblockmediawhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseBlockMediaWhereInputObjectSchema), z.lazy(() => CaseBlockMediaWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseBlockMediaWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseBlockMediaWhereInputObjectSchema), z.lazy(() => CaseBlockMediaWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  blockId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  position: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  alt: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  aspectRatio: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  block: z.union([z.lazy(() => CaseBlockScalarRelationFilterObjectSchema), z.lazy(() => CaseBlockWhereInputObjectSchema)]).optional()
}).strict();
export const CaseBlockMediaWhereInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaWhereInput> = caseblockmediawhereinputSchema as unknown as z.ZodType<Prisma.CaseBlockMediaWhereInput>;
export const CaseBlockMediaWhereInputObjectZodSchema = caseblockmediawhereinputSchema;
