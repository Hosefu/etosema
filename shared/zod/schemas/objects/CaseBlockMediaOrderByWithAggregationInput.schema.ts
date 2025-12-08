import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseBlockMediaCountOrderByAggregateInputObjectSchema as CaseBlockMediaCountOrderByAggregateInputObjectSchema } from './CaseBlockMediaCountOrderByAggregateInput.schema';
import { CaseBlockMediaAvgOrderByAggregateInputObjectSchema as CaseBlockMediaAvgOrderByAggregateInputObjectSchema } from './CaseBlockMediaAvgOrderByAggregateInput.schema';
import { CaseBlockMediaMaxOrderByAggregateInputObjectSchema as CaseBlockMediaMaxOrderByAggregateInputObjectSchema } from './CaseBlockMediaMaxOrderByAggregateInput.schema';
import { CaseBlockMediaMinOrderByAggregateInputObjectSchema as CaseBlockMediaMinOrderByAggregateInputObjectSchema } from './CaseBlockMediaMinOrderByAggregateInput.schema';
import { CaseBlockMediaSumOrderByAggregateInputObjectSchema as CaseBlockMediaSumOrderByAggregateInputObjectSchema } from './CaseBlockMediaSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  blockId: SortOrderSchema.optional(),
  position: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  alt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  aspectRatio: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => CaseBlockMediaCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => CaseBlockMediaAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseBlockMediaMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseBlockMediaMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => CaseBlockMediaSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseBlockMediaOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaOrderByWithAggregationInput>;
export const CaseBlockMediaOrderByWithAggregationInputObjectZodSchema = makeSchema();
