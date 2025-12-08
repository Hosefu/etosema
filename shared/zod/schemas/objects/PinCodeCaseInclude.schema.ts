import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeArgsObjectSchema as PinCodeArgsObjectSchema } from './PinCodeArgs.schema';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema'

const makeSchema = () => z.object({
  pinCode: z.union([z.boolean(), z.lazy(() => PinCodeArgsObjectSchema)]).optional(),
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional()
}).strict();
export const PinCodeCaseIncludeObjectSchema: z.ZodType<Prisma.PinCodeCaseInclude> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseInclude>;
export const PinCodeCaseIncludeObjectZodSchema = makeSchema();
