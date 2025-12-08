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
export const CaseBlockMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMaxOrderByAggregateInput>;
export const CaseBlockMaxOrderByAggregateInputObjectZodSchema = makeSchema();
