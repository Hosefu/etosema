import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { CaseBlockUpdateOneRequiredWithoutMediasNestedInputObjectSchema as CaseBlockUpdateOneRequiredWithoutMediasNestedInputObjectSchema } from './CaseBlockUpdateOneRequiredWithoutMediasNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  position: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  url: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  alt: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  aspectRatio: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  block: z.lazy(() => CaseBlockUpdateOneRequiredWithoutMediasNestedInputObjectSchema).optional()
}).strict();
export const CaseBlockMediaUpdateInputObjectSchema: z.ZodType<Prisma.CaseBlockMediaUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseBlockMediaUpdateInput>;
export const CaseBlockMediaUpdateInputObjectZodSchema = makeSchema();
