import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  caseId: z.string()
}).strict();
export const PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedCreateWithoutPinCodeInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedCreateWithoutPinCodeInput>;
export const PinCodeCaseUncheckedCreateWithoutPinCodeInputObjectZodSchema = makeSchema();
