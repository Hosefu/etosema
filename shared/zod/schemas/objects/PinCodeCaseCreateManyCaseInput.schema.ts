import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  pinCodeId: z.string()
}).strict();
export const PinCodeCaseCreateManyCaseInputObjectSchema: z.ZodType<Prisma.PinCodeCaseCreateManyCaseInput> = makeSchema() as unknown as z.ZodType<Prisma.PinCodeCaseCreateManyCaseInput>;
export const PinCodeCaseCreateManyCaseInputObjectZodSchema = makeSchema();
