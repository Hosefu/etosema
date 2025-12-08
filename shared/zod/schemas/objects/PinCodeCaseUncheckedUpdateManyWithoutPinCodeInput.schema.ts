import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const PinCodeCaseUncheckedUpdateManyWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedUpdateManyWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedUpdateManyWithoutPinCodeInput>;
export const PinCodeCaseUncheckedUpdateManyWithoutPinCodeInputObjectZodSchema = makeSchema();
