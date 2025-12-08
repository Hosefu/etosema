import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  caseId: z.literal(true).optional(),
  type: z.literal(true).optional(),
  content: z.literal(true).optional(),
  settings: z.literal(true).optional(),
  layout: z.literal(true).optional(),
  orderRank: z.literal(true).optional()
}).strict();
export const CaseBlockMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseBlockMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMinAggregateInputType>;
export const CaseBlockMinAggregateInputObjectZodSchema = makeSchema();
