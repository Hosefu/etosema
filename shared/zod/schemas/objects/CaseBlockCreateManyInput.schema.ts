import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  caseId: z.string(),
  type: z.string().optional(),
  content: z.string().optional().nullable(),
  settings: z.string().optional().nullable(),
  layout: z.string(),
  orderRank: z.string()
}).strict();
export const CaseBlockCreateManyInputObjectSchema: z.ZodType<Prisma.CaseBlockCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateManyInput>;
export const CaseBlockCreateManyInputObjectZodSchema = makeSchema();
