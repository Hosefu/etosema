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
export const CaseBlockMediaMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaMinOrderByAggregateInput>;
export const CaseBlockMediaMinOrderByAggregateInputObjectZodSchema = makeSchema();
