import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const designsystemwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => DesignSystemWhereInputObjectSchema), z.lazy(() => DesignSystemWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => DesignSystemWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => DesignSystemWhereInputObjectSchema), z.lazy(() => DesignSystemWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  typography: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  colors: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  links: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cards: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  grid: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  spacing: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  faviconUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const DesignSystemWhereInputObjectSchema: z.ZodType<Prisma.DesignSystemWhereInput> = designsystemwhereinputSchema as unknown as z.ZodType<Prisma.DesignSystemWhereInput>;
export const DesignSystemWhereInputObjectZodSchema = designsystemwhereinputSchema;
