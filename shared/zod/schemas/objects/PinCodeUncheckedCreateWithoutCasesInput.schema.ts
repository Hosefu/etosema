import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinUsageUncheckedCreateNestedManyWithoutPinCodeInputObjectSchema as PinUsageUncheckedCreateNestedManyWithoutPinCodeInputObjectSchema } from './PinUsageUncheckedCreateNestedManyWithoutPinCodeInput.schema'

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
  usages: z.lazy(() => PinUsageUncheckedCreateNestedManyWithoutPinCodeInputObjectSchema).optional()
}).strict();
export const PinCodeUncheckedCreateWithoutCasesInputObjectSchema: z.ZodType<Prisma.PinCodeUncheckedCreateWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeUncheckedCreateWithoutCasesInput>;
export const PinCodeUncheckedCreateWithoutCasesInputObjectZodSchema = makeSchema();
