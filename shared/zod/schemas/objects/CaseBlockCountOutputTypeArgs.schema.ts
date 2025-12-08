import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockCountOutputTypeSelectObjectSchema as CaseBlockCountOutputTypeSelectObjectSchema } from './CaseBlockCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseBlockCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const CaseBlockCountOutputTypeArgsObjectSchema = makeSchema();
export const CaseBlockCountOutputTypeArgsObjectZodSchema = makeSchema();
