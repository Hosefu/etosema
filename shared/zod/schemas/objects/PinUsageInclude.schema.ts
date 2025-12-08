import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeArgsObjectSchema as PinCodeArgsObjectSchema } from './PinCodeArgs.schema'

const makeSchema = () => z.object({
  pinCode: z.union([z.boolean(), z.lazy(() => PinCodeArgsObjectSchema)]).optional()
}).strict();
export const PinUsageIncludeObjectSchema: z.ZodType<Prisma.PinUsageInclude> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageInclude>;
export const PinUsageIncludeObjectZodSchema = makeSchema();
