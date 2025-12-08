import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const PinUsageOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PinUsageOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageOrderByRelationAggregateInput>;
export const PinUsageOrderByRelationAggregateInputObjectZodSchema = makeSchema();
