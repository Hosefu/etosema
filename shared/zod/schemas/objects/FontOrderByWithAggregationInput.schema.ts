import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FontCountOrderByAggregateInputObjectSchema as FontCountOrderByAggregateInputObjectSchema } from './FontCountOrderByAggregateInput.schema';
import { FontMaxOrderByAggregateInputObjectSchema as FontMaxOrderByAggregateInputObjectSchema } from './FontMaxOrderByAggregateInput.schema';
import { FontMinOrderByAggregateInputObjectSchema as FontMinOrderByAggregateInputObjectSchema } from './FontMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  family: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  format: SortOrderSchema.optional(),
  weight: SortOrderSchema.optional(),
  style: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => FontCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => FontMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => FontMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const FontOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.FontOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.FontOrderByWithAggregationInput>;
export const FontOrderByWithAggregationInputObjectZodSchema = makeSchema();
