import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  label: SortOrderSchema.optional(),
  codeHash: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  shortCode: SortOrderSchema.optional(),
  accessAll: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const PinCodeMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeMinOrderByAggregateInput>;
export const PinCodeMinOrderByAggregateInputObjectZodSchema = makeSchema();
