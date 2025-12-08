import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaCreateNestedManyWithoutBlockInputObjectSchema as CaseBlockMediaCreateNestedManyWithoutBlockInputObjectSchema } from './CaseBlockMediaCreateNestedManyWithoutBlockInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  content: z.string().optional().nullable(),
  settings: z.string().optional().nullable(),
  layout: z.string(),
  orderRank: z.string(),
  medias: z.lazy(() => CaseBlockMediaCreateNestedManyWithoutBlockInputObjectSchema).optional()
}).strict();
export const CaseBlockCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseBlockCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockCreateWithoutCaseInput>;
export const CaseBlockCreateWithoutCaseInputObjectZodSchema = makeSchema();
