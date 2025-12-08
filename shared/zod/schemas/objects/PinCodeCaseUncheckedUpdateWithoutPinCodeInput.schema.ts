import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const PinCodeCaseUncheckedUpdateWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedUpdateWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedUpdateWithoutPinCodeInput>;
export const PinCodeCaseUncheckedUpdateWithoutPinCodeInputObjectZodSchema = makeSchema();
