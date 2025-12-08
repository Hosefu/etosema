import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PinUsageCountOrderByAggregateInputObjectSchema as PinUsageCountOrderByAggregateInputObjectSchema } from './PinUsageCountOrderByAggregateInput.schema';
import { PinUsageMaxOrderByAggregateInputObjectSchema as PinUsageMaxOrderByAggregateInputObjectSchema } from './PinUsageMaxOrderByAggregateInput.schema';
import { PinUsageMinOrderByAggregateInputObjectSchema as PinUsageMinOrderByAggregateInputObjectSchema } from './PinUsageMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  pinCodeId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  ip: SortOrderSchema.optional(),
  userAgent: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  success: SortOrderSchema.optional(),
  path: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PinUsageCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PinUsageMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PinUsageMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PinUsageOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PinUsageOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageOrderByWithAggregationInput>;
export const PinUsageOrderByWithAggregationInputObjectZodSchema = makeSchema();
