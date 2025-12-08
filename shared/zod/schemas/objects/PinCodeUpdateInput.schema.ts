import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PinCodeCaseUpdateManyWithoutPinCodeNestedInputObjectSchema as PinCodeCaseUpdateManyWithoutPinCodeNestedInputObjectSchema } from './PinCodeCaseUpdateManyWithoutPinCodeNestedInput.schema';
import { PinUsageUpdateManyWithoutPinCodeNestedInputObjectSchema as PinUsageUpdateManyWithoutPinCodeNestedInputObjectSchema } from './PinUsageUpdateManyWithoutPinCodeNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  label: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  codeHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  code: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  shortCode: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  accessAll: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  cases: z.lazy(() => PinCodeCaseUpdateManyWithoutPinCodeNestedInputObjectSchema).optional(),
  usages: z.lazy(() => PinUsageUpdateManyWithoutPinCodeNestedInputObjectSchema).optional()
}).strict();
export const PinCodeUpdateInputObjectSchema: z.ZodType<Prisma.PinCodeUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeUpdateInput>;
export const PinCodeUpdateInputObjectZodSchema = makeSchema();
