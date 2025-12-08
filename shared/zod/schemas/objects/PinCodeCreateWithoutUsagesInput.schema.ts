import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCaseCreateNestedManyWithoutPinCodeInputObjectSchema as PinCodeCaseCreateNestedManyWithoutPinCodeInputObjectSchema } from './PinCodeCaseCreateNestedManyWithoutPinCodeInput.schema'

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
  cases: z.lazy(() => PinCodeCaseCreateNestedManyWithoutPinCodeInputObjectSchema).optional()
}).strict();
export const PinCodeCreateWithoutUsagesInputObjectSchema: z.ZodType<Prisma.PinCodeCreateWithoutUsagesInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCreateWithoutUsagesInput>;
export const PinCodeCreateWithoutUsagesInputObjectZodSchema = makeSchema();
