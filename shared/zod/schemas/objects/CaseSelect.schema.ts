import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseBlockFindManySchema as CaseBlockFindManySchema } from '../findManyCaseBlock.schema';
import { PinCodeCaseFindManySchema as PinCodeCaseFindManySchema } from '../findManyPinCodeCase.schema';
import { CaseCountOutputTypeArgsObjectSchema as CaseCountOutputTypeArgsObjectSchema } from './CaseCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  slug: z.boolean().optional(),
  title: z.boolean().optional(),
  shortTitle: z.boolean().optional(),
  year: z.boolean().optional(),
  summary: z.boolean().optional(),
  isNda: z.boolean().optional(),
  orderRank: z.boolean().optional(),
  useCustomDesign: z.boolean().optional(),
  backgroundColor: z.boolean().optional(),
  textColor: z.boolean().optional(),
  fontFamily: z.boolean().optional(),
  settings: z.boolean().optional(),
  blocks: z.union([z.boolean(), z.lazy(() => CaseBlockFindManySchema)]).optional(),
  pinAccess: z.union([z.boolean(), z.lazy(() => PinCodeCaseFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const CaseSelectObjectSchema: z.ZodType<Prisma.CaseSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseSelect>;
export const CaseSelectObjectZodSchema = makeSchema();
