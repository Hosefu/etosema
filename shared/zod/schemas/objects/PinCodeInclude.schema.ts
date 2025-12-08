import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseFindManySchema as PinCodeCaseFindManySchema } from '../findManyPinCodeCase.schema';
import { PinUsageFindManySchema as PinUsageFindManySchema } from '../findManyPinUsage.schema';
import { PinCodeCountOutputTypeArgsObjectSchema as PinCodeCountOutputTypeArgsObjectSchema } from './PinCodeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  cases: z.union([z.boolean(), z.lazy(() => PinCodeCaseFindManySchema)]).optional(),
  usages: z.union([z.boolean(), z.lazy(() => PinUsageFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => PinCodeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PinCodeIncludeObjectSchema: z.ZodType<Prisma.PinCodeInclude> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeInclude>;
export const PinCodeIncludeObjectZodSchema = makeSchema();
