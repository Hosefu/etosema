import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  caseId: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  settings: SortOrderSchema.optional(),
  layout: SortOrderSchema.optional(),
  orderRank: SortOrderSchema.optional()
}).strict();
export const CaseBlockMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMinOrderByAggregateInput>;
export const CaseBlockMinOrderByAggregateInputObjectZodSchema = makeSchema();
