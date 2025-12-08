import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockArgsObjectSchema as CaseBlockArgsObjectSchema } from './CaseBlockArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  blockId: z.boolean().optional(),
  block: z.union([z.boolean(), z.lazy(() => CaseBlockArgsObjectSchema)]).optional(),
  position: z.boolean().optional(),
  type: z.boolean().optional(),
  url: z.boolean().optional(),
  alt: z.boolean().optional(),
  aspectRatio: z.boolean().optional()
}).strict();
export const CaseBlockMediaSelectObjectSchema: z.ZodType<Prisma.CaseBlockMediaSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaSelect>;
export const CaseBlockMediaSelectObjectZodSchema = makeSchema();
