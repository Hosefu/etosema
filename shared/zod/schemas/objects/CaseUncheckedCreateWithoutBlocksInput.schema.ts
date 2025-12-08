import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseUncheckedCreateNestedManyWithoutCaseInputObjectSchema as PinCodeCaseUncheckedCreateNestedManyWithoutCaseInputObjectSchema } from './PinCodeCaseUncheckedCreateNestedManyWithoutCaseInput.schema'

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
  updatedAt: z.coerce.date().optional(),
  pinAccess: z.lazy(() => PinCodeCaseUncheckedCreateNestedManyWithoutCaseInputObjectSchema).optional()
}).strict();
export const CaseUncheckedCreateWithoutBlocksInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateWithoutBlocksInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateWithoutBlocksInput>;
export const CaseUncheckedCreateWithoutBlocksInputObjectZodSchema = makeSchema();
