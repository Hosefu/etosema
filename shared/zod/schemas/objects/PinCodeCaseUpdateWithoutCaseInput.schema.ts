import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeUpdateOneRequiredWithoutCasesNestedInputObjectSchema as PinCodeUpdateOneRequiredWithoutCasesNestedInputObjectSchema } from './PinCodeUpdateOneRequiredWithoutCasesNestedInput.schema'

const makeSchema = () => z.object({
  pinCode: z.lazy(() => PinCodeUpdateOneRequiredWithoutCasesNestedInputObjectSchema).optional()
}).strict();
export const PinCodeCaseUpdateWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateWithoutCaseInput>;
export const PinCodeCaseUpdateWithoutCaseInputObjectZodSchema = makeSchema();
