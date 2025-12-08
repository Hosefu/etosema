import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeArgsObjectSchema as PinCodeArgsObjectSchema } from './PinCodeArgs.schema';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema'

const makeSchema = () => z.object({
  pinCodeId: z.boolean().optional(),
  caseId: z.boolean().optional(),
  pinCode: z.union([z.boolean(), z.lazy(() => PinCodeArgsObjectSchema)]).optional(),
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional()
}).strict();
export const PinCodeCaseSelectObjectSchema: z.ZodType<Prisma.PinCodeCaseSelect> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseSelect>;
export const PinCodeCaseSelectObjectZodSchema = makeSchema();
