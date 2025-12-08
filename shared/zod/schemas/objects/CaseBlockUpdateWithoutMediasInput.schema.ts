import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseUpdateOneRequiredWithoutBlocksNestedInputObjectSchema as CaseUpdateOneRequiredWithoutBlocksNestedInputObjectSchema } from './CaseUpdateOneRequiredWithoutBlocksNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  settings: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  layout: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  orderRank: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutBlocksNestedInputObjectSchema).optional()
}).strict();
export const CaseBlockUpdateWithoutMediasInputObjectSchema: z.ZodType<Prisma.CaseBlockUpdateWithoutMediasInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockUpdateWithoutMediasInput>;
export const CaseBlockUpdateWithoutMediasInputObjectZodSchema = makeSchema();
