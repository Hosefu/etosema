import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockArgsObjectSchema as CaseBlockArgsObjectSchema } from './CaseBlockArgs.schema'

const makeSchema = () => z.object({
  block: z.union([z.boolean(), z.lazy(() => CaseBlockArgsObjectSchema)]).optional()
}).strict();
export const CaseBlockMediaIncludeObjectSchema: z.ZodType<Prisma.CaseBlockMediaInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaInclude>;
export const CaseBlockMediaIncludeObjectZodSchema = makeSchema();
