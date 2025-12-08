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
export const FontCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FontCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FontCountOrderByAggregateInput>;
export const FontCountOrderByAggregateInputObjectZodSchema = makeSchema();
