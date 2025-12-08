import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCountOutputTypeCountCasesArgsObjectSchema as PinCodeCountOutputTypeCountCasesArgsObjectSchema } from './PinCodeCountOutputTypeCountCasesArgs.schema';
import { PinCodeCountOutputTypeCountUsagesArgsObjectSchema as PinCodeCountOutputTypeCountUsagesArgsObjectSchema } from './PinCodeCountOutputTypeCountUsagesArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => PinCodeCountOutputTypeCountCasesArgsObjectSchema)]).optional(),
  usages: z.union([z.boolean(), z.lazy(() => PinCodeCountOutputTypeCountUsagesArgsObjectSchema)]).optional()
}).strict();
export const PinCodeCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PinCodeCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCountOutputTypeSelect>;
export const PinCodeCountOutputTypeSelectObjectZodSchema = makeSchema();
