import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const DesignSystemSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.DesignSystemSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.DesignSystemSumOrderByAggregateInput>;
export const DesignSystemSumOrderByAggregateInputObjectZodSchema = makeSchema();
