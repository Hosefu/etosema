import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const profilescalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ProfileScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProfileScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProfileScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProfileScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ProfileScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  contactsJson: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  projectsJson: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  socialsJson: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  logoUrl: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  logoText: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  lockedCaseMessage: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ProfileScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ProfileScalarWhereWithAggregatesInput> = profilescalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ProfileScalarWhereWithAggregatesInput>;
export const ProfileScalarWhereWithAggregatesInputObjectZodSchema = profilescalarwherewithaggregatesinputSchema;
