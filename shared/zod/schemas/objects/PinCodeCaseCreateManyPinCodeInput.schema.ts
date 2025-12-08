import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  caseId: z.string()
}).strict();
export const PinCodeCaseCreateManyPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateManyPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateManyPinCodeInput>;
export const PinCodeCaseCreateManyPinCodeInputObjectZodSchema = makeSchema();
