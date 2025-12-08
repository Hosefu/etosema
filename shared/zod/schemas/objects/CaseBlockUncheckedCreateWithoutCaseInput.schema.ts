import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaUncheckedCreateNestedManyWithoutBlockInputObjectSchema as CaseBlockMediaUncheckedCreateNestedManyWithoutBlockInputObjectSchema } from './CaseBlockMediaUncheckedCreateNestedManyWithoutBlockInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  type: z.string().optional(),
  content: z.string().optional().nullable(),
  settings: z.string().optional().nullable(),
  layout: z.string(),
  orderRank: z.string(),
  medias: z.lazy(() => CaseBlockMediaUncheckedCreateNestedManyWithoutBlockInputObjectSchema).optional()
}).strict();
export const CaseBlockUncheckedCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseBlockUncheckedCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUncheckedCreateWithoutCaseInput>;
export const CaseBlockUncheckedCreateWithoutCaseInputObjectZodSchema = makeSchema();
