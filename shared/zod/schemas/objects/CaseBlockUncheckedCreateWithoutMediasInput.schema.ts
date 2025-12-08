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
export const CaseBlockUncheckedCreateWithoutMediasInputObjectSchema: z.ZodType<Prisma.CaseBlockUncheckedCreateWithoutMediasInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUncheckedCreateWithoutMediasInput>;
export const CaseBlockUncheckedCreateWithoutMediasInputObjectZodSchema = makeSchema();
