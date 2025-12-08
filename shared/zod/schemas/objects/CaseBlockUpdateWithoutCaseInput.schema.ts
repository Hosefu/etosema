import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseBlockMediaUpdateManyWithoutBlockNestedInputObjectSchema as CaseBlockMediaUpdateManyWithoutBlockNestedInputObjectSchema } from './CaseBlockMediaUpdateManyWithoutBlockNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  settings: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  layout: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderRank: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  medias: z.lazy(() => CaseBlockMediaUpdateManyWithoutBlockNestedInputObjectSchema).optional()
}).strict();
export const CaseBlockUpdateWithoutCaseInputObjectSchema: z.ZodType<Prisma.CaseBlockUpdateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUpdateWithoutCaseInput>;
export const CaseBlockUpdateWithoutCaseInputObjectZodSchema = makeSchema();
