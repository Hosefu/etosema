import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageCreateNestedManyWithoutPinCodeInputObjectSchema as PinUsageCreateNestedManyWithoutPinCodeInputObjectSchema } from './PinUsageCreateNestedManyWithoutPinCodeInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  label: z.string().optional().nullable(),
  codeHash: z.string(),
  code: z.string().optional().nullable(),
  shortCode: z.string().optional().nullable(),
  accessAll: z.boolean().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  usages: z.lazy(() => PinUsageCreateNestedManyWithoutPinCodeInputObjectSchema).optional()
}).strict();
export const PinCodeCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.PinCodeCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCreateWithoutCasesInput>;
export const PinCodeCreateWithoutCasesInputObjectZodSchema = makeSchema();
