import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PinCodeCreateNestedOneWithoutCasesInputObjectSchema as PinCodeCreateNestedOneWithoutCasesInputObjectSchema } from './PinCodeCreateNestedOneWithoutCasesInput.schema';
import { CaseCreateNestedOneWithoutPinAccessInputObjectSchema as CaseCreateNestedOneWithoutPinAccessInputObjectSchema } from './CaseCreateNestedOneWithoutPinAccessInput.schema'

const makeSchema = () => z.object({
  pinCode: z.lazy(() => PinCodeCreateNestedOneWithoutCasesInputObjectSchema),
  case: z.lazy(() => CaseCreateNestedOneWithoutPinAccessInputObjectSchema)
}).strict();
export const PinCodeCaseCreateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateInput>;
export const PinCodeCaseCreateInputObjectZodSchema = makeSchema();
