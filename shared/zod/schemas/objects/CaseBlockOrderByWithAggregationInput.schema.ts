import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { CaseBlockCountOrderByAggregateInputObjectSchema as CaseBlockCountOrderByAggregateInputObjectSchema } from './CaseBlockCountOrderByAggregateInput.schema';
import { CaseBlockMaxOrderByAggregateInputObjectSchema as CaseBlockMaxOrderByAggregateInputObjectSchema } from './CaseBlockMaxOrderByAggregateInput.schema';
import { CaseBlockMinOrderByAggregateInputObjectSchema as CaseBlockMinOrderByAggregateInputObjectSchema } from './CaseBlockMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  content: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  settings: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  layout: SortOrderSchema.optional(),
  orderRank: SortOrderSchema.optional(),
  _count: z.lazy(() => CaseBlockCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => CaseBlockMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => CaseBlockMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const CaseBlockOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.CaseBlockOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockOrderByWithAggregationInput>;
export const CaseBlockOrderByWithAggregationInputObjectZodSchema = makeSchema();
