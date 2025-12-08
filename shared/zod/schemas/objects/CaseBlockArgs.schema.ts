import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockSelectObjectSchema as CaseBlockSelectObjectSchema } from './CaseBlockSelect.schema';
import { CaseBlockIncludeObjectSchema as CaseBlockIncludeObjectSchema } from './CaseBlockInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseBlockSelectObjectSchema).optional(),
  include: z.lazy(() => CaseBlockIncludeObjectSchema).optional()
}).strict();
export const CaseBlockArgsObjectSchema = makeSchema();
export const CaseBlockArgsObjectZodSchema = makeSchema();
