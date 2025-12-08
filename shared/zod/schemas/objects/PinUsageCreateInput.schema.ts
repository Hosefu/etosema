import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCreateNestedOneWithoutUsagesInputObjectSchema as PinCodeCreateNestedOneWithoutUsagesInputObjectSchema } from './PinCodeCreateNestedOneWithoutUsagesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  ip: z.string(),
  userAgent: z.string().optional().nullable(),
  success: z.boolean(),
  path: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  pinCode: z.lazy(() => PinCodeCreateNestedOneWithoutUsagesInputObjectSchema).optional()
}).strict();
export const PinUsageCreateInputObjectSchema: z.ZodType<Prisma.PinUsageCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinUsageCreateInput>;
export const PinUsageCreateInputObjectZodSchema = makeSchema();
