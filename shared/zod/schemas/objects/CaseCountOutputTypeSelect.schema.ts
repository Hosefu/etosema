import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseCountOutputTypeCountBlocksArgsObjectSchema as CaseCountOutputTypeCountBlocksArgsObjectSchema } from './CaseCountOutputTypeCountBlocksArgs.schema';
import { CaseCountOutputTypeCountPinAccessArgsObjectSchema as CaseCountOutputTypeCountPinAccessArgsObjectSchema } from './CaseCountOutputTypeCountPinAccessArgs.schema'

const makeSchema = () => z.object({
  blocks: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountBlocksArgsObjectSchema)]).optional(),
  pinAccess: z.union([z.boolean(), z.lazy(() => CaseCountOutputTypeCountPinAccessArgsObjectSchema)]).optional()
}).strict();
export const CaseCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.CaseCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.CaseCountOutputTypeSelect>;
export const CaseCountOutputTypeSelectObjectZodSchema = makeSchema();
