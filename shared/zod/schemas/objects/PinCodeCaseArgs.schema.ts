import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseSelectObjectSchema as PinCodeCaseSelectObjectSchema } from './PinCodeCaseSelect.schema';
import { PinCodeCaseIncludeObjectSchema as PinCodeCaseIncludeObjectSchema } from './PinCodeCaseInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PinCodeCaseSelectObjectSchema).optional(),
  include: z.lazy(() => PinCodeCaseIncludeObjectSchema).optional()
}).strict();
export const PinCodeCaseArgsObjectSchema = makeSchema();
export const PinCodeCaseArgsObjectZodSchema = makeSchema();
