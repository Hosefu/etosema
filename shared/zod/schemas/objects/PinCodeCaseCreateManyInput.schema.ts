import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  pinCodeId: z.string(),
  caseId: z.string()
}).strict();
export const PinCodeCaseCreateManyInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateManyInput>;
export const PinCodeCaseCreateManyInputObjectZodSchema = makeSchema();
