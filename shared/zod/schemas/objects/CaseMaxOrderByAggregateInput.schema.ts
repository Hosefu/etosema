import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  slug: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  shortTitle: SortOrderSchema.optional(),
  year: SortOrderSchema.optional(),
  summary: SortOrderSchema.optional(),
  isNda: SortOrderSchema.optional(),
  orderRank: SortOrderSchema.optional(),
  useCustomDesign: SortOrderSchema.optional(),
  backgroundColor: SortOrderSchema.optional(),
  textColor: SortOrderSchema.optional(),
  fontFamily: SortOrderSchema.optional(),
  settings: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const CaseMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseMaxOrderByAggregateInput>;
export const CaseMaxOrderByAggregateInputObjectZodSchema = makeSchema();
