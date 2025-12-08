import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockMediaSelectObjectSchema as CaseBlockMediaSelectObjectSchema } from './CaseBlockMediaSelect.schema';
import { CaseBlockMediaIncludeObjectSchema as CaseBlockMediaIncludeObjectSchema } from './CaseBlockMediaInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CaseBlockMediaSelectObjectSchema).optional(),
  include: z.lazy(() => CaseBlockMediaIncludeObjectSchema).optional()
}).strict();
export const CaseBlockMediaArgsObjectSchema = makeSchema();
export const CaseBlockMediaArgsObjectZodSchema = makeSchema();
