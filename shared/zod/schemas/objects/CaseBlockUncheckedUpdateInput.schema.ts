import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseBlockMediaUncheckedUpdateManyWithoutBlockNestedInputObjectSchema as CaseBlockMediaUncheckedUpdateManyWithoutBlockNestedInputObjectSchema } from './CaseBlockMediaUncheckedUpdateManyWithoutBlockNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  caseId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  settings: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  layout: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderRank: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  medias: z.lazy(() => CaseBlockMediaUncheckedUpdateManyWithoutBlockNestedInputObjectSchema).optional()
}).strict();
export const CaseBlockUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.CaseBlockUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUncheckedUpdateInput>;
export const CaseBlockUncheckedUpdateInputObjectZodSchema = makeSchema();
