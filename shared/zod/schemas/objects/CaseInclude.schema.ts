import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockFindManySchema as CaseBlockFindManySchema } from '../findManyCaseBlock.schema';
import { PinCodeCaseFindManySchema as PinCodeCaseFindManySchema } from '../findManyPinCodeCase.schema';
import { CaseCountOutputTypeArgsObjectSchema as CaseCountOutputTypeArgsObjectSchema } from './CaseCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  blocks: z.union([z.boolean(), z.lazy(() => CaseBlockFindManySchema)]).optional(),
  pinAccess: z.union([z.boolean(), z.lazy(() => PinCodeCaseFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseIncludeObjectSchema: z.ZodType<Prisma.CaseInclude> = makeSchema() as unknown as z.ZodType<Prisma.CaseInclude>;
export const CaseIncludeObjectZodSchema = makeSchema();
