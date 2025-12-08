import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CaseBlockOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockOrderByRelationAggregateInput>;
export const CaseBlockOrderByRelationAggregateInputObjectZodSchema = makeSchema();
