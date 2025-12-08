import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

const caseblockmediascalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => CaseBlockMediaScalarWhereInputObjectSchema), z.lazy(() => CaseBlockMediaScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => CaseBlockMediaScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => CaseBlockMediaScalarWhereInputObjectSchema), z.lazy(() => CaseBlockMediaScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  blockId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  position: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  alt: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  aspectRatio: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const CaseBlockMediaScalarWhereInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaScalarWhereInput> = caseblockmediascalarwhereinputSchema as unknown as z.ZodType<Prisma.CaseBlockMediaScalarWhereInput>;
export const CaseBlockMediaScalarWhereInputObjectZodSchema = caseblockmediascalarwhereinputSchema;
