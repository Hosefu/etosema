import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const profilewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ProfileWhereInputObjectSchema), z.lazy(() => ProfileWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ProfileWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ProfileWhereInputObjectSchema), z.lazy(() => ProfileWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  description: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  contactsJson: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  projectsJson: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  socialsJson: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  logoUrl: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  logoText: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lockedCaseMessage: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ProfileWhereInputObjectSchema: z.ZodType<Prisma.ProfileWhereInput> = profilewhereinputSchema as unknown as z.ZodType<Prisma.ProfileWhereInput>;
export const ProfileWhereInputObjectZodSchema = profilewhereinputSchema;
