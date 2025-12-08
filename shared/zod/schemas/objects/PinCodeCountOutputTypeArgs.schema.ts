import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCountOutputTypeSelectObjectSchema as PinCodeCountOutputTypeSelectObjectSchema } from './PinCodeCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PinCodeCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const PinCodeCountOutputTypeArgsObjectSchema = makeSchema();
export const PinCodeCountOutputTypeArgsObjectZodSchema = makeSchema();
