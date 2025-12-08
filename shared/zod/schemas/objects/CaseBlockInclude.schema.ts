import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseArgsObjectSchema as CaseArgsObjectSchema } from './CaseArgs.schema';
import { CaseBlockMediaFindManySchema as CaseBlockMediaFindManySchema } from '../findManyCaseBlockMedia.schema';
import { CaseBlockCountOutputTypeArgsObjectSchema as CaseBlockCountOutputTypeArgsObjectSchema } from './CaseBlockCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  case: z.union([z.boolean(), z.lazy(() => CaseArgsObjectSchema)]).optional(),
  medias: z.union([z.boolean(), z.lazy(() => CaseBlockMediaFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseBlockCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseBlockIncludeObjectSchema: z.ZodType<Prisma.CaseBlockInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockInclude>;
export const CaseBlockIncludeObjectZodSchema = makeSchema();
