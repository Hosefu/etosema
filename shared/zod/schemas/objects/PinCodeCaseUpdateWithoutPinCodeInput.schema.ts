import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseUpdateOneRequiredWithoutPinAccessNestedInputObjectSchema as CaseUpdateOneRequiredWithoutPinAccessNestedInputObjectSchema } from './CaseUpdateOneRequiredWithoutPinAccessNestedInput.schema'

const makeSchema = () => z.object({
  case: z.lazy(() => CaseUpdateOneRequiredWithoutPinAccessNestedInputObjectSchema).optional()
}).strict();
export const PinCodeCaseUpdateWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUpdateWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUpdateWithoutPinCodeInput>;
export const PinCodeCaseUpdateWithoutPinCodeInputObjectZodSchema = makeSchema();
