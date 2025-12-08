import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseCreateNestedManyWithoutCaseInputObjectSchema as PinCodeCaseCreateNestedManyWithoutCaseInputObjectSchema } from './PinCodeCaseCreateNestedManyWithoutCaseInput.schema'

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
  pinAccess: z.lazy(() => PinCodeCaseCreateNestedManyWithoutCaseInputObjectSchema).optional()
}).strict();
export const CaseCreateWithoutBlocksInputObjectSchema: z.ZodType<Prisma.CaseCreateWithoutBlocksInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateWithoutBlocksInput>;
export const CaseCreateWithoutBlocksInputObjectZodSchema = makeSchema();
