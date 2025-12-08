import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  pinCodeId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const PinCodeCaseUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedUpdateManyInput>;
export const PinCodeCaseUncheckedUpdateManyInputObjectZodSchema = makeSchema();
