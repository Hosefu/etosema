import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  year: SortOrderSchema.optional()
}).strict();
export const CaseSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseSumOrderByAggregateInput>;
export const CaseSumOrderByAggregateInputObjectZodSchema = makeSchema();
