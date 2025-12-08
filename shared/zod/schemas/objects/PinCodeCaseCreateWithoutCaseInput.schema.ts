import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCreateNestedOneWithoutCasesInputObjectSchema as PinCodeCreateNestedOneWithoutCasesInputObjectSchema } from './PinCodeCreateNestedOneWithoutCasesInput.schema'

const makeSchema = () => z.object({
  pinCode: z.lazy(() => PinCodeCreateNestedOneWithoutCasesInputObjectSchema)
}).strict();
export const PinCodeCaseCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateWithoutCaseInput>;
export const PinCodeCaseCreateWithoutCaseInputObjectZodSchema = makeSchema();
