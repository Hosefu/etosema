import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  position: SortOrderSchema.optional()
}).strict();
export const CaseBlockMediaSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaSumOrderByAggregateInput>;
export const CaseBlockMediaSumOrderByAggregateInputObjectZodSchema = makeSchema();
