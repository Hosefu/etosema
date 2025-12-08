import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageSelectObjectSchema as PinUsageSelectObjectSchema } from './PinUsageSelect.schema';
import { PinUsageIncludeObjectSchema as PinUsageIncludeObjectSchema } from './PinUsageInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PinUsageSelectObjectSchema).optional(),
  include: z.lazy(() => PinUsageIncludeObjectSchema).optional()
}).strict();
export const PinUsageArgsObjectSchema = makeSchema();
export const PinUsageArgsObjectZodSchema = makeSchema();
