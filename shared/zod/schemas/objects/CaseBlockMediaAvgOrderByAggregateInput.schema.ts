import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  position: SortOrderSchema.optional()
}).strict();
export const CaseBlockMediaAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaAvgOrderByAggregateInput>;
export const CaseBlockMediaAvgOrderByAggregateInputObjectZodSchema = makeSchema();
