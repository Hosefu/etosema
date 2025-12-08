import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseFindManySchema as PinCodeCaseFindManySchema } from '../findManyPinCodeCase.schema';
import { PinUsageFindManySchema as PinUsageFindManySchema } from '../findManyPinUsage.schema';
import { PinCodeCountOutputTypeArgsObjectSchema as PinCodeCountOutputTypeArgsObjectSchema } from './PinCodeCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  codeHash: z.boolean().optional(),
  code: z.boolean().optional(),
  shortCode: z.boolean().optional(),
  accessAll: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  cases: z.union([z.boolean(), z.lazy(() => PinCodeCaseFindManySchema)]).optional(),
  usages: z.union([z.boolean(), z.lazy(() => PinUsageFindManySchema)]).optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  _count: z.union([z.boolean(), z.lazy(() => PinCodeCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const PinCodeSelectObjectSchema: z.ZodType<Prisma.PinCodeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeSelect>;
export const PinCodeSelectObjectZodSchema = makeSchema();
