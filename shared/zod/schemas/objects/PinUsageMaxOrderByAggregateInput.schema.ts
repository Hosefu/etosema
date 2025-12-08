import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  pinCodeId: SortOrderSchema.optional(),
  ip: SortOrderSchema.optional(),
  userAgent: SortOrderSchema.optional(),
  success: SortOrderSchema.optional(),
  path: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional()
}).strict();
export const PinUsageMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PinUsageMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageMaxOrderByAggregateInput>;
export const PinUsageMaxOrderByAggregateInputObjectZodSchema = makeSchema();
