import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  pinCodeId: z.string()
}).strict();
export const PinCodeCaseUncheckedCreateWithoutCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedCreateWithoutCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedCreateWithoutCaseInput>;
export const PinCodeCaseUncheckedCreateWithoutCaseInputObjectZodSchema = makeSchema();
