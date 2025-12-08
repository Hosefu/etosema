import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const ProfileAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProfileAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProfileAvgOrderByAggregateInput>;
export const ProfileAvgOrderByAggregateInputObjectZodSchema = makeSchema();
