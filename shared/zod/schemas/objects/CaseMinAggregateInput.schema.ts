import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  slug: z.literal(true).optional(),
  title: z.literal(true).optional(),
  shortTitle: z.literal(true).optional(),
  year: z.literal(true).optional(),
  summary: z.literal(true).optional(),
  isNda: z.literal(true).optional(),
  orderRank: z.literal(true).optional(),
  useCustomDesign: z.literal(true).optional(),
  backgroundColor: z.literal(true).optional(),
  textColor: z.literal(true).optional(),
  fontFamily: z.literal(true).optional(),
  settings: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const CaseMinAggregateInputObjectSchema: z.ZodType<Prisma.CaseMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.CaseMinAggregateInputType>;
export const CaseMinAggregateInputObjectZodSchema = makeSchema();
