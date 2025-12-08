import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  family: SortOrderSchema.optional(),
  url: SortOrderSchema.optional(),
  format: SortOrderSchema.optional(),
  weight: SortOrderSchema.optional(),
  style: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const FontMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FontMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FontMaxOrderByAggregateInput>;
export const FontMaxOrderByAggregateInputObjectZodSchema = makeSchema();
