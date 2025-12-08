import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeSelectObjectSchema as PinCodeSelectObjectSchema } from './PinCodeSelect.schema';
import { PinCodeIncludeObjectSchema as PinCodeIncludeObjectSchema } from './PinCodeInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PinCodeSelectObjectSchema).optional(),
  include: z.lazy(() => PinCodeIncludeObjectSchema).optional()
}).strict();
export const PinCodeArgsObjectSchema = makeSchema();
export const PinCodeArgsObjectZodSchema = makeSchema();
