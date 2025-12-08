import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeArgsObjectSchema as PinCodeArgsObjectSchema } from './PinCodeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  pinCodeId: z.boolean().optional(),
  pinCode: z.union([z.boolean(), z.lazy(() => PinCodeArgsObjectSchema)]).optional(),
  ip: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  success: z.boolean().optional(),
  path: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const PinUsageSelectObjectSchema: z.ZodType<Prisma.PinUsageSelect> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageSelect>;
export const PinUsageSelectObjectZodSchema = makeSchema();
