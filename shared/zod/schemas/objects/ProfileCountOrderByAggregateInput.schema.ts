import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  contactsJson: SortOrderSchema.optional(),
  projectsJson: SortOrderSchema.optional(),
  socialsJson: SortOrderSchema.optional(),
  logoUrl: SortOrderSchema.optional(),
  logoText: SortOrderSchema.optional(),
  lockedCaseMessage: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ProfileCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProfileCountOrderByAggregateInput>;
export const ProfileCountOrderByAggregateInputObjectZodSchema = makeSchema();
