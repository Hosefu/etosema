import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  slug: z.string(),
  title: z.string(),
  shortTitle: z.string().optional().nullable(),
  year: z.number().int(),
  summary: z.string().optional().nullable(),
  isNda: z.boolean().optional(),
  orderRank: z.string(),
  useCustomDesign: z.boolean().optional(),
  backgroundColor: z.string().optional().nullable(),
  textColor: z.string().optional().nullable(),
  fontFamily: z.string().optional().nullable(),
  settings: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const CaseCreateManyInputObjectSchema: z.ZodType<Prisma.CaseCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateManyInput>;
export const CaseCreateManyInputObjectZodSchema = makeSchema();
