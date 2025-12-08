import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  blockId: SortOrderSchema.optional(),
  position: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  alt: SortOrderSchema.optional(),
  aspectRatio: SortOrderSchema.optional()
}).strict();
export const CaseBlockMediaMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaMaxOrderByAggregateInput>;
export const CaseBlockMediaMaxOrderByAggregateInputObjectZodSchema = makeSchema();
