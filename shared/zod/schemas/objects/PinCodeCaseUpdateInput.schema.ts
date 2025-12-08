import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeUpdateOneRequiredWithoutCasesNestedInputObjectSchema as PinCodeUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './PinCodeUpdateOneRequiredWithoutCasesNestedInput.schema';
import { CaseUpdateOneRequiredWithoutPinAccessNestedInputObjectSchema as CaseUpdateOneRequiredWithoutPinAccessNestedInputObjectSchema } from './CaseUpdateOneRequiredWithoutPinAccessNestedInput.schema'

const makeSchema = () => z.object({
  pinCode: z.lazy(() => PinCodeUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional(),
  case: z.lazy(() => CaseUpdateOneRequiredWithoutPinAccessNestedInputObjectSchema).optional()
}).strict();
export const PinCodeCaseUpdateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateInput>;
export const PinCodeCaseUpdateInputObjectZodSchema = makeSchema();
