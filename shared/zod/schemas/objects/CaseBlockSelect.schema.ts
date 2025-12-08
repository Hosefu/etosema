import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { CaseBlockMediaFindManySchema as CaseBlockMediaFindManySchema } from '../findManyCaseBlockMedia.schema';
import { CaseBlockCountOutputTypeArgsObjectSchema as CaseBlockCountOutputTypeArgsObjectSchema } from './CaseBlockCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  caseId: z.boolean().optional(),
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  type: z.boolean().optional(),
  content: z.boolean().optional(),
  settings: z.boolean().optional(),
  layout: z.boolean().optional(),
  orderRank: z.boolean().optional(),
  medias: z.union([z.boolean(), z.lazy(() => CaseBlockMediaFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseBlockCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseBlockSelectObjectSchema: z.ZodType<Prisma.CaseBlockSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockSelect>;
export const CaseBlockSelectObjectZodSchema = makeSchema();
