import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  description: SortOrderSchema.optional(),
  contactsJson: SortOrderSchema.optional(),
  projectsJson: SortOrderSchema.optional(),
  socialsJson: SortOrderSchema.optional(),
  logoUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  logoText: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  lockedCaseMessage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ProfileOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ProfileOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProfileOrderByWithRelationInput>;
export const ProfileOrderByWithRelationInputObjectZodSchema = makeSchema();
