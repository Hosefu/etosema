import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ProfileCountOrderByAggregateInputObjectSchema as ProfileCountOrderByAggregateInputObjectSchema } from './ProfileCountOrderByAggregateInput.schema';
import { ProfileAvgOrderByAggregateInputObjectSchema as ProfileAvgOrderByAggregateInputObjectSchema } from './ProfileAvgOrderByAggregateInput.schema';
import { ProfileMaxOrderByAggregateInputObjectSchema as ProfileMaxOrderByAggregateInputObjectSchema } from './ProfileMaxOrderByAggregateInput.schema';
import { ProfileMinOrderByAggregateInputObjectSchema as ProfileMinOrderByAggregateInputObjectSchema } from './ProfileMinOrderByAggregateInput.schema';
import { ProfileSumOrderByAggregateInputObjectSchema as ProfileSumOrderByAggregateInputObjectSchema } from './ProfileSumOrderByAggregateInput.schema'

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
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ProfileAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ProfileSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ProfileOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ProfileOrderByWithAggregationInput>;
export const ProfileOrderByWithAggregationInputObjectZodSchema = makeSchema();
