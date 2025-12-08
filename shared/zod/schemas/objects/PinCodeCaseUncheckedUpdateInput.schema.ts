import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  pinCodeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const PinCodeCaseUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedUpdateInput>;
export const PinCodeCaseUncheckedUpdateInputObjectZodSchema = makeSchema();
