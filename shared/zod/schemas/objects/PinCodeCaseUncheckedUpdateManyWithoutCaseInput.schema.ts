import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  pinCodeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const PinCodeCaseUncheckedUpdateManyWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedUpdateManyWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedUpdateManyWithoutCaseInput>;
export const PinCodeCaseUncheckedUpdateManyWithoutCaseInputObjectZodSchema = makeSchema();
