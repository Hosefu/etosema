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
export const CaseBlockCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCountOrderByAggregateInput>;
export const CaseBlockCountOrderByAggregateInputObjectZodSchema = makeSchema();
