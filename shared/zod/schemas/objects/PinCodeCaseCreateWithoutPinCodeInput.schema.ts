import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CaseCreateNestedOneWithoutPinAccessInputObjectSchema as CaseCreateNestedOneWithoutPinAccessInputObjectSchema } from './CaseCreateNestedOneWithoutPinAccessInput.schema'

const makeSchema = () => z.object({
  case: z.lazy(() => CaseCreateNestedOneWithoutPinAccessInputObjectSchema)
}).strict();
export const PinCodeCaseCreateWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateWithoutPinCodeInput>;
export const PinCodeCaseCreateWithoutPinCodeInputObjectZodSchema = makeSchema();
