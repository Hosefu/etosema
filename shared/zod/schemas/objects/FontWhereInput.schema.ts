import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const fontwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FontWhereInputObjectSchema), z.lazy(() => FontWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FontWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FontWhereInputObjectSchema), z.lazy(() => FontWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  family: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  format: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  weight: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  style: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FontWhereInputObjectSchema: z.ZodType<Prisma.FontWhereInput> = fontwhereinputSchema as unknown as z.ZodType<Prisma.FontWhereInput>;
export const FontWhereInputObjectZodSchema = fontwhereinputSchema;
