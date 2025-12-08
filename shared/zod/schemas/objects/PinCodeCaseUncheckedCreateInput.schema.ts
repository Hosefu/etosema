import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  pinCodeId: z.string(),
  caseId: z.string()
}).strict();
export const PinCodeCaseUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PinCodeCaseUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseUncheckedCreateInput>;
export const PinCodeCaseUncheckedCreateInputObjectZodSchema = makeSchema();
