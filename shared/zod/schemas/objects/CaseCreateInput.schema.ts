import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCreateNestedManyWithoutCaseInputObjectSchema as CaseBlockCreateNestedManyWithoutCaseInputObjectSchema } from './CaseBlockCreateNestedManyWithoutCaseInput.schema';
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
  blocks: z.lazy(() => CaseBlockCreateNestedManyWithoutCaseInputObjectSchema).optional(),
  pinAccess: z.lazy(() => PinCodeCaseCreateNestedManyWithoutCaseInputObjectSchema).optional()
}).strict();
export const CaseCreateInputObjectSchema: z.ZodType<Prisma.CaseCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseCreateInput>;
export const CaseCreateInputObjectZodSchema = makeSchema();
