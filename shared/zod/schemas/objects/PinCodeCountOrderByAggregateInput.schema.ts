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
export const PinCodeCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PinCodeCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCountOrderByAggregateInput>;
export const PinCodeCountOrderByAggregateInputObjectZodSchema = makeSchema();
